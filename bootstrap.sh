#!/usr/bin/env bash

# install all softwares

apt-get update
apt-get install -y nginx python-software-properties python g++ make

# adding nodejs ppa just once
if [ ! -e "/etc/apt/sources.list.d/chris-lea-node_js-precise.list" ]
then
	add-apt-repository ppa:chris-lea/node.js
fi

apt-get update
apt-get install -y nodejs

# disable default nginx settings
rm -f /etc/nginx/sites-enabled/default
# use the mootools instead
cp /vagrant/nginx/mootools /etc/nginx/sites-enabled

cd /vagrant

# give www-data permissions to /vagrant
chown -R www-data:vagrant .

# run node apps
npm install forever -g

forever start prime-website
# /etc/init.d/elements start

