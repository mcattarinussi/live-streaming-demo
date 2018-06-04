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

Create the app deployment
```bash
$ kubectl create -f ./deployment.yml
```

View information about the deployment
```bash
$ kubectl get deployments
NAME                  DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
live-streaming-demo   1         1         1            1           1m
```

Expose the Pod
```bash
$ kubectl expose deployment live-streaming-demo --type=NodePort
```

Check the service has been created
```bash
$ kubectl get services
NAME                  TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)          AGE
kubernetes            ClusterIP   10.96.0.1      <none>        443/TCP          1m
live-streaming-demo   NodePort    10.101.41.73   <none>        8080:30841/TCP   2s
```

Get the public app url
```bash
$ export LIVE_STREAM_URL=$(minikube service live-streaming-demo --url)
$ echo $LIVE_STREAM_URL
http://192.168.99.100:30841
```

Setup the live stream video url `$LIVE_STREAM_URL/stream.mpd` in your dash client. Check [here](https://en.wikipedia.org/wiki/Dynamic_Adaptive_Streaming_over_HTTP#Clients_and_libraries) for a list of supported clients.

## TODO

- [ ] Simple client webapp
- [ ] Deploy
- [ ] Implement user authentication
- [ ] Limit user concurrent access to 3 video streams
