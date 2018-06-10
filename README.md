# Live streaming demo

Demo project to experiment with live video streaming, nodejs and kubernetes.

The app uses [MPEG-DASH](https://en.wikipedia.org/wiki/Dynamic_Adaptive_Streaming_over_HTTP) technique to stream live video content.

The live streaming is simulated by looping a sample video.

## Local development

To build and run the app locally you need to install [Docker](https://docs.docker.com/install/).

### Build and push Docker images

    sh build.sh

**Note**: you need to be logged in to a Docker registry to push the images, see [docker login](https://docs.docker.com/engine/reference/commandline/login/). 

### Run locally

To run the application locally you need to install [Minikube](https://kubernetes.io/docs/tasks/tools/install-minikube/).

Start the minikube cluster
```bash
$ minikube start
```

Deploy the application
```bash
$ kubectl create -f ./deployment.yml
```

Open the app in your browser
- On MacOS: `open $(minikube service live-streaming-demo-frontend --url)`
- On linux: `xdg-open $(minikube service live-streaming-demo-frontend --url)`

## TODO

- [x] Simple client webapp
- [x] Deploy local
- [x] Implement user authentication
- [ ] Limit user concurrent access to 3 video streams
- [ ] Deploy on cloud
