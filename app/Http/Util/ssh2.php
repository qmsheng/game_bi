<?php

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/10/8
 * Time: 17:28
 */
namespace App\Http\Util;

class ssh2 {

    private $ssh_conn = NULL;
    private $ssh_ftp = NULL;

    public function __construct($ip, $port, $user, $pass) {
        $this->ssh_connect($ip, $port, $user, $pass);
    }

    public function __destruct() {
        $this->ssh_disconnect();
    }

    private function ssh_connect($ip, $port, $user, $pass) {
        //连接服务器，需要WEB服务器关闭selinux
        if (!($this->ssh_conn = ssh2_connect($ip, $port))) {
            return false;
        }
        //登录
        if (!ssh2_auth_password($this->ssh_conn, $user, $pass)) {
            return false;
        }
        return true;
    }

    private function ssh_disconnect() {
        if ($this->ssh_conn != NULL) {
            $this->exec('echo "EXITING" && exit;');
            $this->ssh_conn = NULL;
        }
    }

    public function exec($cmd) {
        if (!($stream = ssh2_exec($this->ssh_conn, $cmd))) {
            throw new Exception('SSH command failed');
        }
        stream_set_blocking($stream, true);
        $data = "";
        while ($buf = fread($stream, 4096)) {
            $data .= $buf;
        }
        fclose($stream);
        return $data;
    }
}