#!/bin/bash

DOCKER_USER=$(docker info | sed '/Username:/!d;s/.* //');

echo "Building dash-encoder"
docker build -t live-streaming-demo-encoder -f dash-encoder.docker .

echo "Building node app"
docker build -t live-streaming-demo-app -f node-app.docker .

if [ $DOCKER_USER ]
then
    echo "Pushing dash-encoder"
    docker tag live-streaming-demo-encoder $DOCKER_USER/live-streaming-demo-encoder
    docker push $DOCKER_USER/live-streaming-demo-encoder
    echo "Pushing node-app"
    docker tag live-streaming-demo-app $DOCKER_USER/live-streaming-demo-app
    docker push $DOCKER_USER/live-streaming-demo-app
else
    echo "User not logged in: skip pushing docker images to Dockerhub"
fi

echo "Done!"
