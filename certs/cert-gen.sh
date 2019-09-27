#!/bin/bash

#Required
domain=server
commonname=$domain

#Optional
password=x

if [ -z "$domain" ]
then
    echo "Domain is undefined."
    echo "Useage $0 [common name]"

    exit 99
fi

echo "Generating key request for $domain"

#Generate a key
openssl genrsa -des3 -passout pass:$password -out $domain.key 2048 -noout
#Remove passphrase from the key. Comment the line out to keep the passphrase
echo "Removing passphrase from key"
openssl rsa -in $domain.key -passin pass:$password -out $domain.key

#Create the request
echo "Creating crt"
openssl req -x509 -new -key $domain.key -out $domain.crt -passin pass:$password \
    -subj "/CN=$commonname"

echo "---------------------------"
echo "-----Below is your crt-----"
echo "---------------------------"
echo
cat $domain.crt

echo
echo "---------------------------"
echo "-----Below is your Key-----"
echo "---------------------------"
echo
cat $domain.key
