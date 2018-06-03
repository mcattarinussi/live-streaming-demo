# Nodejs live streaming demo

Demo project to experiment with live video streaming, nodejs and kubernetes.

The app uses [MPEG-DASH](https://en.wikipedia.org/wiki/Dynamic_Adaptive_Streaming_over_HTTP) technique to stream live video content.

The live streaming is simulated by looping a sample video.

## Development setup

Install [Docker](https://docs.docker.com/install/)

Build the dash-encoder component

    docker build . -t dash-encoder

Run the dash-encoder component

    docker run -v "/$PWD/.chunks":/chunks dash-encoder

## TODO

- [ ] Simple client webapp
- [ ] Deploy
- [ ] Implement user authentication
- [ ] Limit user concurrent access to 3 video streams
