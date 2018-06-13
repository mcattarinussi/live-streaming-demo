# Live streaming demo

Demo project to experiment with live video streaming, nodejs and kubernetes.

The app uses [MPEG-DASH](https://en.wikipedia.org/wiki/Dynamic_Adaptive_Streaming_over_HTTP) technique to stream live video content.

The live streaming is simulated by looping a sample video.

You can try the application at http://35.230.152.32. Login with email `guest@example.com` and password `pass`.

## Build and push Docker images

To build the Docker images locally you need to install [Docker](https://docs.docker.com/install/).

Then run

    sh build.sh

This will build all the app components images and push them to the configured image registry.

**Note**: you need to be logged in your Docker registry service to push the images, see [docker login](https://docs.docker.com/engine/reference/commandline/login/). 

## Deploy the app on Google Cloud Platform

Install and configure the [Google Cloud SDK](https://cloud.google.com/sdk/downloads).

The app will be deployed on Google Cloud using [kubernetes](https://kubernetes.io/).

Create the project

    gcloud projects create live-streaming-demo

Create and activate the local configuration for the project

    gcloud config configurations create live-streaming-demo --activate --account <YOUR_GMAIL_EMAIL> --project live-streaming-demo

Optionally, setup the region/zone where you want to deploy the kubernetes cluster (see available [regions/zones](https://cloud.google.com/compute/docs/regions-zones/))

    gcloud config set compute/zone <YOUR_ZONE>

Enable container service (you need to enable the billing for the project, check [here](https://cloud.google.com/billing/docs/how-to/modify-project))
    
    gcloud services enable container

Create the kubernetes cluster
    
    gcloud container clusters create live-streaming-demo --node-version latest --num-nodes 1

Fetch credentials for the cluster
    
    gcloud container clusters get-credentials live-streaming-demo

Deploy the application

    kubectl create -f ./deployment

Check if all the services are up and running

    $ kubectl get services
    NAME                           TYPE           CLUSTER-IP      EXTERNAL-IP      PORT(S)        AGE
    kubernetes                     ClusterIP      10.63.240.1     <none>           443/TCP        50m
    live-streaming-demo-api        ClusterIP      10.63.244.172   <none>           80/TCP         50m
    live-streaming-demo-encoder    ClusterIP      10.63.246.248   <none>           80/TCP         50m
    live-streaming-demo-frontend   LoadBalancer   10.63.254.23    35.230.128.140   80:31281/TCP   50m
    live-streaming-demo-redis      ClusterIP      10.63.255.224   <none>           6379/TCP       50m

Copy and paste the `EXTERNAL_IP` of the `live-streaming-demo-frontend` in your browser to use the app.

## Run the app locally

To run the application locally you need to install [Minikube](https://kubernetes.io/docs/tasks/tools/install-minikube/).

Start the minikube cluster

    minikube start

Use minikube cluster context

    kubectl config use-context minikube

Deploy the application

    kubectl create -f ./deployment

Open the app in your browser
- On MacOS: `open $(minikube service live-streaming-demo-frontend --url)`
- On linux: `xdg-open $(minikube service live-streaming-demo-frontend --url)`
