/* main.c
   Create a basic container that executes a given command in new namespace(s)
   as well as mount a separate proc filesystem
*/
#define _GNU_SOURCE

#include <sched.h>
#include <unistd.h>
#include <stdlib.h>
#include <sys/utsname.h>
#include <sys/wait.h>
#include <sys/mount.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <sys/syscall.h>
#include <string.h>
#include <fcntl.h>
#include <limits.h>
#include <errno.h>
#include <signal.h>
#include <stdio.h>
#include <time.h>
#include <sys/time.h>
#include <sys/resource.h>

#define TEST1 0
#define TEST2 0

/* Ham xu ly loi */
#define errExit(msg)    do { perror(msg); exit(EXIT_FAILURE); \
                        } while (0)

/* Bridge mac dinh, phuc vu cho ket noi mang cho container*/
#define BRIDGE "cni0"
const char *hostname = "inside_container";

/* in ra huong dan su dung chuong trinh*/
static void usage(char *pname) {
    fprintf(stderr, "Usage: %s [options] cmd [arg...]\n", pname);
    fprintf(stderr, "Options can be:\n");
    exit(EXIT_FAILURE);
}

//system call pivot_root se chuyen thu muc root cua cac process trong cung NS thanh a 
int pivot_root(char *a, char *b) {
    if (mount(a, a, "bind", MS_BIND | MS_REC, "") < 0) {
        errExit("error mount");
    }

    printf("pivot setup ok\n");

    return syscall(SYS_pivot_root, a, b);
}

/* pipeline -  dung de truyen thong tin giua container va host NS */
int checkpoint[2];

/* tao ki tu ngau nhien*/
void rand_char(char *str, int size) {
    char new[size];
    for (int i = 0; i < size; i++) {
        new[i] = 'A' + (rand() % 26);
    }
    new[size] = '\0';
    strncpy(str, new, size);
    return;
}

/*Tao veth-cau noi giua container va brige, trong truong hop cac container muon ket noi voi nhay hoac noi voi may host*/
int create_peer() {
    char *id = (char *) malloc(4);
    char *set_int;
    char *set_int_up;
    char *add_to_bridge;

    rand_char(id, 4);
    printf("id is %s\n", id);
    asprintf(&set_int, "ip link add veth%s type veth peer name veth1", id);
    system(set_int);
    asprintf(&set_int_up, "ip link set veth%s up", id);
    system(set_int_up);
    asprintf(&add_to_bridge, "ip link set veth%s master %s", id, BRIDGE);
    system(add_to_bridge);

    free(id);
    return 0;
}

/*Them container vao veth*/
int network_setup(pid_t pid) {
    char *set_pid_ns;
    asprintf(&set_pid_ns, "ip link set veth1 netns %d", pid);
    system(set_pid_ns);
    return 0;
}

/* Chinh sua file 'map_file', voi gia tri trong chuoi 'mapping', 
   dinh nghia cach mapping UID, GID cac process trong va ngoai NS. 
   Chuoi mapping co cau truc nhu sau:

       ID_inside-ns    ID-outside-ns   length
   Viec mapping nay duoc thuc hien boi process cha nam trong host NS.
 */

static void update_map(char *mapping, char *map_file) {
    int fd, j;
    size_t map_len;     /* Do dai cua 'mapping' */

    map_len = strlen(mapping);
    for (j = 0; j < map_len; j++)
        if (mapping[j] == ',')
            mapping[j] = '\n';

    fd = open(map_file, O_RDWR);
    if (fd == -1) {
        fprintf(stderr, "open %s: %s\n", map_file, strerror(errno));
        exit(EXIT_FAILURE);
    }

    if (write(fd, mapping, map_len) != map_len) {
        fprintf(stderr, "write %s: %s\n", map_file, strerror(errno));
        exit(EXIT_FAILURE);
    }

    close(fd);
}

/* Linux kernel 3.19 cap nhat lai tinh nang setgroups(2) va 'gid_map' file
   de xu ly lo hong bao mat khi mot user khong duoc cap quyen nhung lai 
   "lach luat" bang cach tao mot NS va cap nhat gid mapping de nhay quyen. 
   Kernel 3.19 yeu cau, khi muon them mapping moi trong 'gid_maps' file, thi 
   ham setgroup() cua mot trong nhung process nam trong NS moi phai bi "DENY"
   bang cach them truong "DENY" vao /proc/PID/setgroups voi PID thuoc NS moi.
*/

static void proc_setgroups_write(pid_t child_pid, char *str) {
    char setgroups_path[PATH_MAX];
    int fd;

    snprintf(setgroups_path, PATH_MAX, "/proc/%ld/setgroups",
             (long) child_pid);

    fd = open(setgroups_path, O_RDWR);
    if (fd == -1) {

        /* Voi kernel linux doi cu, chua cos co che setgroup nen folder
           /proc/PID/setgroups khong ton tai.*/

        if (errno != ENOENT)
            fprintf(stderr, "ERROR: open %s: %s\n", setgroups_path,
                    strerror(errno));
        return;
    }

    if (write(fd, str, strlen(str)) == -1)
        fprintf(stderr, "ERROR: write %s: %s\n", setgroups_path,
                strerror(errno));

    close(fd);
}

#define MEMORY "1073741824"
#define SHARES "256"
#define PIDS "64"
#define WEIGHT "10"
#define FD_COUNT 64

struct cgrp_control {
	char control[256];
	struct cgrp_setting {
		char name[256];
		char value[256];
	} **settings;
};
struct cgrp_setting add_to_tasks = {
	.name = "tasks",
	.value = "0"
};

struct cgrp_control *cgrps[] = {
	& (struct cgrp_control) {
		.control = "memory",
		.settings = (struct cgrp_setting *[]) {
			& (struct cgrp_setting) {
				.name = "memory.limit_in_bytes",
				.value = MEMORY
			},
			& (struct cgrp_setting) {
				.name = "memory.kmem.limit_in_bytes",
				.value = MEMORY
			},
			&add_to_tasks,
			NULL
		}
	},
	& (struct cgrp_control) {
		.control = "cpu",
		.settings = (struct cgrp_setting *[]) {
			& (struct cgrp_setting) {
				.name = "cpu.shares",
				.value = SHARES
			},
			&add_to_tasks,
			NULL
		}
	},
	& (struct cgrp_control) {
		.control = "pids",
		.settings = (struct cgrp_setting *[]) {
			& (struct cgrp_setting) {
				.name = "pids.max",
				.value = PIDS
			},
			&add_to_tasks,
			NULL
		}
	},
	& (struct cgrp_control) {
		.control = "blkio",
		.settings = (struct cgrp_setting *[]) {
			& (struct cgrp_setting) {
				.name = "blkio.weight",
				.value = WEIGHT
			},
			&add_to_tasks,
			NULL
		}
	},
	NULL
};
int resources()
{
	fprintf(stderr, "=> setting cgroups...");
	for (struct cgrp_control **cgrp = cgrps; *cgrp; cgrp++) {
		char dir[PATH_MAX] = {0};
		fprintf(stderr, "%s...", (*cgrp)->control);
		if (snprintf(dir, sizeof(dir), "/sys/fs/cgroup/%s/%s",
			     (*cgrp)->control, hostname) == -1) {
			return -1;
		}
		if (mkdir(dir, S_IRUSR | S_IWUSR | S_IXUSR)) {
			fprintf(stderr, "mkdir %s failed: %m\n", dir);
			return -1;
		}
		for (struct cgrp_setting **setting = (*cgrp)->settings; *setting; setting++) {
			char path[PATH_MAX] = {0};
			int fd = 0;
			if (snprintf(path, sizeof(path), "%s/%s", dir,
				     (*setting)->name) == -1) {
				fprintf(stderr, "snprintf failed: %m\n");
				return -1;
			}
			if ((fd = open(path, O_WRONLY)) == -1) {
				fprintf(stderr, "opening %s failed: %m\n", path);
				return -1;
			}
			if (write(fd, (*setting)->value, strlen((*setting)->value)) == -1) {
				fprintf(stderr, "writing to %s failed: %m\n", path);
				close(fd);
				return -1;
			}
			close(fd);
		}
	}
	fprintf(stderr, "done.\n");
	fprintf(stderr, "=> setting rlimit...");
	if (setrlimit(RLIMIT_NOFILE,
		      & (struct rlimit) {
			.rlim_max = FD_COUNT,
			.rlim_cur = FD_COUNT,
		})) {
		fprintf(stderr, "failed: %m\n");
		return 1;
	}
	fprintf(stderr, "done.\n");
	return 0;
}

int free_resources()
{
	fprintf(stderr, "=> cleaning cgroups...");
	for (struct cgrp_control **cgrp = cgrps; *cgrp; cgrp++) {
		char dir[PATH_MAX] = {0};
		char task[PATH_MAX] = {0};
		int task_fd = 0;
		if (snprintf(dir, sizeof(dir), "/sys/fs/cgroup/%s/%s",
			     (*cgrp)->control, hostname) == -1
		    || snprintf(task, sizeof(task), "/sys/fs/cgroup/%s/tasks",
				(*cgrp)->control) == -1) {
			fprintf(stderr, "snprintf failed: %m\n");
			return -1;
		}
		if ((task_fd = open(task, O_WRONLY)) == -1) {
			fprintf(stderr, "opening %s failed: %m\n", task);
			return -1;
		}
		if (write(task_fd, "0", 2) == -1) {
			fprintf(stderr, "writing to %s failed: %m\n", task);
			close(task_fd);
			return -1;
		}
		close(task_fd);
		if (rmdir(dir)) {
			fprintf(stderr, "rmdir %s failed: %m", dir);
			return -1;
		}
	}
	fprintf(stderr, "done.\n");
	return 0;
}

/* Chuong trinh se duoc chay trong container moi duoc tao */
static int childFunc(void *arg) {
    char ch;
    char **argv = arg;

    /* Child process trong NS moi se doi parrent trong host NS mapping xong UID vs GID
       Cu the, lenh read() tu mot dau cua pipiline se doi cho toi khi nao dau ben kia 
       cos EOF, dong nghia voi parrent prcoess close() dau ghi cua pipeline*/

    close(checkpoint[1]);    /* child process khong can ghi vao pipeline nen ta close*/
    if (read(checkpoint[0], &ch, 1) != 0) {
        fprintf(stderr, "Failure in child: read from pipe returned != 0\n");
        exit(EXIT_FAILURE);
    }

    #if TEST1	
    clock_t begin = clock();
    printf("CLOCKS_PER_SEC %ld \n",CLOCKS_PER_SEC);
    printf("bat dau qua trinh setup child process %ld \n",begin);
    #endif

    printf("[In child namespace] childFunc(): PID  = %ld\n", (long) getpid());
    printf("[In child namespace] childFunc(): PPID = %ld\n", (long) getppid());

    struct utsname uts;

    /* Doi hostname cho container vi ta da tao hostname NS*/

    if (sethostname(hostname, strlen(hostname)) == -1)
        errExit("sethostname");

    /* Hien thi hostname cua container*/

    if (uname(&uts) == -1)
        errExit("uname");
    printf("[In child namespace] uts.nodename in child:  %s\n", uts.nodename);

    /* Mount lai filesystem cho mount NS va tao interface moi cho network NS */

    if (pivot_root("./rootfs", "./rootfs/.old") < 0) {
        errExit("error pivot");
    }
    /*proc la mot loai filesystem dac biet nen can mount rieng*/
    if (mount("proc", "/proc", "proc", 0, NULL) < 0)
        errExit("error mounting new procfs");

    //cap nhat lai root cho container
    chdir("/");

    //umount thu muc trung gian de dam bao bao mat 
    if (umount2("/.old", MNT_DETACH) < 0)
        errExit("error unmount old");

    // kich hoat veth cho container
    system("ip link set veth1 up");

    char *ip_cmd;
    asprintf(&ip_cmd, "ip addr add %s/24 dev veth1", argv[0]);
    system(ip_cmd); //them ip moi do user setup cho container
    system("ip route add default via 10.240.0.1 dev veth1"); // them route, BRIGE co the hieu nhu mot router cho container, veth1 nhu duong noi giua container va BRIGE

    #if TEST1
	    int fd = open("/home/output.txt",O_RDWR );
    clock_t end = clock();
    dprintf(fd,"child process setup xong cho child process %ld \n",end);
    close(fd);
    #endif 

    execvp(argv[1], &argv[1]);
    errExit("execvp");
}

#define STACK_SIZE (1024 * 1024)

static char child_stack[STACK_SIZE];    /* STACK SIZE thay doi tuy theo phan cung va kernel, tu 1MB den 8MB*/

int main(int argc, char *argv[]) {

    #if TEST1
    int fd = open("/home/aothatday/hdd/containers_basics/parent.txt",O_RDWR);
    clock_t begin = clock();
    dprintf(fd,"CLOCKS_PER_SEC %ld \n",CLOCKS_PER_SEC);
    dprintf(fd,"bat dau qua trinh setup cua parent process %ld \n",begin);
    #endif

    pid_t child_pid;
    char *uid_map, *gid_map;
    const int MAP_BUF_SIZE = 100;
    char map_buf[MAP_BUF_SIZE];
    char map_path[PATH_MAX];

    srand(time(0));


    if (argc < 2) {
        usage(argv[0]);
    }

    /* pipeline duoc dung de dong bo hoa giua parent va child NS. Chung ta can thuc thi chuong trinh trong container bang execvp() sau khi parrent process  
da mapping xong UID va GID cho child process trong NS moi. Dieu nay dam bao cac quyen duoc cap cho container khong bi mat di khi thuc thi execvp()*/

    if (pipe(checkpoint) == -1)
        errExit("pipe");

    resources();

//    system("mount --make-rprivate  /");
    printf("[In main namespace] starting...\n");
    create_peer();
// clone process moi trong 6 loai NS moi
    child_pid = clone(childFunc, child_stack + STACK_SIZE,
                      SIGCHLD | CLONE_NEWIPC | CLONE_NEWNS | CLONE_NEWPID | CLONE_NEWUTS | CLONE_NEWNET | CLONE_NEWUSER,
                      &argv[1]);
    if (child_pid == -1)
        errExit("clone");

    printf("[In main namespace] %s: PID of child created by clone() is %ld\n",
           argv[0], (long) child_pid);

    /* Mapping UID va GID cho child process trong NS moi */

    snprintf(map_path, PATH_MAX, "/proc/%ld/uid_map", (long) child_pid);
    snprintf(map_buf, MAP_BUF_SIZE, "0 %ld 1", (long) getuid());
    uid_map = map_buf;
    update_map(uid_map, map_path);

    proc_setgroups_write(child_pid, "deny");

    snprintf(map_path, PATH_MAX, "/proc/%ld/gid_map", (long) child_pid);
    snprintf(map_buf, MAP_BUF_SIZE, "0 %ld 1", (long) getgid());
    gid_map = map_buf;
    update_map(gid_map, map_path);

    /* gan PID cua child process cho veth */
    network_setup(child_pid);

    /* Dong dau ghi cua pipeline, bao hieu cho child process qua trinh mapping da ket thuc */

    #if TEST1
    clock_t end = clock();
    dprintf(fd,"parent process setup xong cho child process %ld \n",end);
    close(fd);
    #endif 

    close(checkpoint[1]);


    if (waitpid(child_pid, NULL, 0) == -1)      /* doi child process ket thuc */
        errExit("waitpid");

    printf("[In main namespace] %s: terminating\n", argv[0]);

	free_resources();

    exit(EXIT_SUCCESS);
}

