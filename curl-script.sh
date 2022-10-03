#!/bin/sh

curl -X POST -H "Content-type:application/json" --data  '\"user5\" : { \"name\" : \"mohit\", \"password\" : \"password5\", \"profession\" : \"teacher\", \"id\" :5}' http://212.227.213.103/addUser

curl --data '{\"user5\":{ \"name\":\"simon\", \"password\":\"password5\", \"profession\":\"student\", \"id\":5 } }' -H "Content-Type: application/json" http://212.227.213.103/post
