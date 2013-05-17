# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "precise32"
  config.vm.box_url = "http://files.vagrantup.com/precise32.box"
  config.vm.provision :shell, :path => "config/vagrant_bootstrap.sh"
  config.vm.network :forwarded_port, host: 5000, guest: 80
  config.vm.network :forwarded_port, host: 5001, guest: 3000
end
