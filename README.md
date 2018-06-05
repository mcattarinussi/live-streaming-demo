# Nodejs live streaming demo

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

Create the backend deployment and service
```bash
$ kubectl create -f ./deployment.yml
```

Check if the service has been created
```bash
$ kubectl get services
NAME                          TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)        AGE
kubernetes                    ClusterIP   10.96.0.1        <none>        443/TCP        5s
live-streaming-demo-backend   NodePort    10.100.157.228   <none>        80:32560/TCP   7s
```

Get the public app url
```bash
$ export LIVE_STREAM_URL=$(minikube service live-streaming-demo --url)
$ echo $LIVE_STREAM_URL
http://192.168.99.100:32560
```

Setup the live stream video url `$LIVE_STREAM_URL/stream.mpd` in your dash client. Check [here](https://en.wikipedia.org/wiki/Dynamic_Adaptive_Streaming_over_HTTP#Clients_and_libraries) for a list of supported clients.

## TODO

- [ ] Simple client webapp
- [ ] Deploy
- [ ] Implement user authentication
- [ ] Limit user concurrent access to 3 video streams
