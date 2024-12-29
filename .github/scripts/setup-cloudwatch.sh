#!/bin/bash

sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a stop || true
sudo rm -f /opt/aws/amazon-cloudwatch-agent/etc/amazon-cloudwatch-agent.json || true
sudo rm -f /opt/aws/amazon-cloudwatch-agent/etc/amazon-cloudwatch-agent.d/* || true
sudo dpkg -r amazon-cloudwatch-agent || true

wget --tries=3 --timeout=60 https://s3.amazonaws.com/amazoncloudwatch-agent/ubuntu/amd64/latest/amazon-cloudwatch-agent.deb -O /tmp/amazon-cloudwatch-agent.deb
sudo dpkg -i /tmp/amazon-cloudwatch-agent.deb
rm /tmp/amazon-cloudwatch-agent.deb

sudo usermod -a -G docker cwagent

sed -i "s/{service_name}/$SERVICE_NAME/g" cloudwatch-config.json
sed -i "s/{central_account_id}/$CENTRAL_ACCOUNT_ID/g" cloudwatch-config.json
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -s -c file:cloudwatch-config.json
sudo systemctl restart amazon-cloudwatch-agent

sleep 5
sudo systemctl status amazon-cloudwatch-agent
