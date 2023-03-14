#! /bin/bash

#doc option
while getopts a:i: flag
do
    case "${flag}" in
        a) ip=${OPTARG};; #ip muon gan cho container
        # m) image_dir=${OPTARG};;
	i) id=${OPTARG};; #id cua container
    esac
done

root_dir=$(pwd)

#tao folder chua code user
mkdir -p ./code/${id};
chmod -R 777 ./code
cd ./code/${id};

touch temp.sh code.sh code.c output.txt;
echo "#! /bin/bash " >> temp.sh;
echo "exec 3>&1 4>&2" >> temp.sh
echo "trap 'exec 2>&4 1>&3' 0 1 2 3 RETURN" >> temp.sh
echo "exec 1>output.txt 2>&1" >> temp.sh
echo " cd /home" >> temp.sh;
echo "gcc code.c -o code" >> temp.sh;
echo " /home/code" >> temp.sh;

echo "#! /bin/bash " >> code.sh
echo "exec 3>&1 4>&2" >> code.sh;
echo "trap 'exec 2>&4 1>&3' 0 1 2 3 RETURN" >> code.sh;
echo "exec 1>output.txt 2>&1" >> code.sh;
echo "/home/temp.sh" >> code.sh; 
chmod 777 temp.sh code.sh code.c output.txt;
cd ${root_dir};

#khoi tao brigde
brctl addbr cni0;
ip link set cni0 up;

#them dia chi ip cua container vao bridge
ip addr add ${ip}/24 dev cni0;

#tao rootfs cho container
dir_name="${id}"
mkdir ${dir_name};
chmod 777 ${dir_name};
#cp rootfs.tar ${dir_name}

cd ${dir_name};

mkdir rootfs;
chmod 777 rootfs;
tar xvf ../rootfs.tar -C ./rootfs;
mkdir ./rootfs/.old;
chmod -R 777 ./rootfs;

#mount thu muc chua code cua user vao container
#cp ../code/${id}/* ./rootfs/home
mount --bind ../code/${id} ./rootfs/home
#chmod 777 ../code/${id}
 
#tao container
chmod -R 777 .;
sudo ../basic_container/bin/basic_container "${ip}" "/home/code.sh";

#doc output tu file

cat ./rootfs/home/output.txt

#don dep container 
cd ..;
pwd
sudo umount ${id}/rootfs/home
rm -r ${dir_name};

#ip addr del ${ip}/32 dev cni0;



