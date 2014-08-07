#!/bin/bash

# Erlang
if [ ! -d "/src/erlang" ]; then
  apt-get update
  apt-get -y install build-essential m4 libncurses5-dev libssh-dev unixodbc-dev libgmp3-dev libwxgtk2.8-dev libglu1-mesa-dev fop xsltproc default-jdk
  mkdir -p /src/erlang
  cd /src/erlang
  wget http://www.erlang.org/download/otp_src_R15B.tar.gz
  tar -xvzf otp_src_R15B.tar.gz
  chmod -R 777 otp_src_R15B
  cd otp_src_R15B
  ./configure
  make
  make install
fi

# Riak
if [ ! -d "/src/riak" ]; then
  apt-get update
  apt-get -y install build-essential libc6-dev-i386 git
  mkdir -p /src/riak
  cd /src/riak
  wget http://s3.amazonaws.com/downloads.basho.com/riak/1.4/1.4.10/riak-1.4.10.tar.gz
  tar zxvf riak-1.4.10.tar.gz
  cd riak-1.4.10
  make rel
  make devrel DEVNODES=5
  cd /src/riak/riak-1.4.10/dev
  for node in `ls`; do sed -i 's/127.0.0.1/192.168.33.10/g' $node/etc/app.config; done
fi

ulimit -n 4096
cd /src/riak/riak-1.4.10/dev
for node in `ls`; do $node/bin/riak start; done
for n in {2..5}; do dev$n/bin/riak-admin cluster join dev1@127.0.0.1; done
dev1/bin/riak-admin cluster plan
dev2/bin/riak-admin cluster commit
dev1/bin/riak-admin member-status

