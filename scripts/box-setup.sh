#!/bin/bash

# 1) Generic machine updates
apt update && apt -y upgrade

# 2) Install docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"

# 3) Add docker and friends
apt update && apt -y install apt-transport-https ca-certificates curl gnupg-agent software-properties-common docker-ce docker-ce-cli containerd.io haveged unattended-upgrades

# 4) Add user w/ sudo
useradd --user-group --create-home --shell /bin/bash --groups sudo,docker taylor

# 7) Copy authorized ssh keys from root to taylor
mkdir /home/taylor/.ssh
cp /root/.ssh/authorized_keys /home/taylor/.ssh/authorized_keys
chown -R taylor:taylor /home/taylor

# 8) Disable root ssh login
awk '$1=="PermitRootLogin"{foundLine=1; print "PermitRootLogin no"} $1!="PermitRootLogin"{print $0} END{if(foundLine!=1) print "permitRootLogin no"}' /etc/ssh/sshd_config > sshd_config.tmp && mv sshd_config.tmp /etc/ssh/sshd_config

# configure automatic updates through unattended-uprades
sudo dpkg-reconfigure -plow unattended-upgrades

# add the automatic reboot time for updates
sudo tee -a  /etc/apt/apt.conf.d/50unattended-upgrades > /dev/null <<EOT
Unattended-Upgrade::Automatic-Reboot "true";
Unattended-Upgrade::Automatic-Reboot-Time "02:00";
EOT

# 4) Add docker group
groupadd docker

# 5) Add docker compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.28.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose