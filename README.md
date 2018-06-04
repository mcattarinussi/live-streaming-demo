# Nodejs live streaming demo

Demo project to experiment with live video streaming, nodejs and kubernetes.

The app uses [MPEG-DASH](https://en.wikipedia.org/wiki/Dynamic_Adaptive_Streaming_over_HTTP) technique to stream live video content.

The live streaming is simulated by looping a sample video.

## Local development

To build and run the app locally you need to install [Docker](https://docs.docker.com/install/).

### Build and push images

    sh build.sh

**Note**: you need to be logged in to a Docker registry to push the images, see [docker login](https://docs.docker.com/engine/reference/commandline/login/). 

### Run the app

Run the dash-encoder component

    docker run -v "/$PWD/.chunks":/chunks live-streaming-demo-encoder

Run the nodejs server app

    docker run -v "/$PWD/.chunks":/chunks -P live-streaming-demo-app

Watch the live stream using one of the [supported clients](https://en.wikipedia.org/wiki/Dynamic_Adaptive_Streaming_over_HTTP#Clients_and_libraries).

## TODO

- [ ] Simple client webapp
- [ ] Deploy
- [ ] Implement user authentication
- [ ] Limit user concurrent access to 3 video streams
