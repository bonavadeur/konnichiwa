<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\user2;
use App\Models\Message;

class mainController extends Controller
{
    public function home() {
        return view("home");
    }

    public function exec(Request $request) {
        $input = $request->input;
        $id = $request->id;
        exec("mkdir code/$id");
        exec("touch code/$id/code.c");
        exec("chmod -R 777 code/*");

        $file = fopen("code/$id/code.c", "w") or die("Unable to open file!");
        fwrite($file, $request->input);
        fclose($file);

        exec("sudo ./script.sh -a 10.42.0.3 -i $id");

        if(filesize("code/$id/output.txt")) {
            $file = fopen("code/$id/output.txt", "r");
            $result = fread($file,filesize("code/$id/output.txt"));
            fclose($file);
        } else {
            $result = "";
        }
        

        exec("rm -rf code/$id");

        // $result = $request->input;
        return response()->json($result);
    }

    public function send(Request $request) {
        $auth = user2::where('username', $request->username)->where('password', $request->password)->first();
        if($auth) {
            $msg = new Message;
            $msg->id = Message::max('id') + 1;
            $msg->sender = $request->username;
            $msg->receiver = $request->receiver;
            $msg->message = $request->message;
            $msg->cert = $request->cert;
            $msg->signature = $request->signature;
            $msg->save();
            return response()->json($msg);
        }
    }

    public function refresh(Request $rq) {
        $auth = user2::where('username', $rq->username)->where('password', $rq->password)->first();
        if($auth) {
            $message = Message::where('receiver', $rq->username)->orderByDesc('id')->take(5)->get();
            return response()->json($message);
        }
        
    }
}
