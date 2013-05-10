#!/usr/bin/env bash

# install all softwares

apt-get update
apt-get install -y nginx python-software-properties python g++ make

if [ ! -e "/etc/apt/sources.list.d/chris-lea-node_js-precise.list" ]
then
	add-apt-repository ppa:chris-lea/node.js
fi

apt-get update
apt-get install -y nodejs

# run node apps

cd /vagrant

npm install

cp /vagrant/init/* /etc/init.d

./node_modules/.bin/forever start prime-website
# /etc/init.d/elements start

