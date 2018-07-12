# Telltale

Telltale responds to HTTP queries with every header, connection detail and env variable it can find in JSON format.

## Why?

[For the glory of Sata](http://weknowmemes.com/wp-content/uploads/2012/02/why-for-the-glory-of-satan-of-course.jpg)..erm, right.

When configuring and debugging load balancers, proxies, API gateways or orchestrators (Kubernetes, Mesos), you often need to find out what is getting through and how it looks like, or what environment variables is the container seeing. Sometimes you also need to debug your browser, to see if your ad blocker really puts that Do Not Track request header.

Telltale is for debugging these cases, or when you just need something to respond to your tests with `200 OK` and that WordPress container just seems too big.

## How do I run this in production?

You don't. Seriously, don't. Leave a debug mode on for your production environment if you wish to play with danger, but do not run this.

## Usage

Telltale comes with zero external requirements, so only Node.js is needed.

Environment variables aren't printed by default since 1.1 and environment variable `envVars=true` needs to be set to print them.

IP to listen in (default: 0.0.0.0) and port (default: 8080) are also defined as env variables: LISTEN_IP & LISTEN_PORT

Simplest way to run it is simply typing `npm start` in its folder on a server. Expect following results in response:

```
{
  "remoteAddress": "172.0.0.1",
  "remotePort": 45896,
  "requestHeaders": {
    "host": "localhost:8080",
    "connection": "keep-alive",
    "upgrade-insecure-requests": "1",
    "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36",
    "dnt": "1",
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "en-US,en;q=0.9,fi;q=0.8,sv;q=0.7"
  },
  "requestMethod": "GET",
  "requestUrl": "/",
  "requestParams": {},
  "envVariables": {
    "KDE_MULTIHEAD": "false",
    "CLUTTER_IM_MODULE": "xim",
    "GS_LIB": "/home/username/.fonts",
    "KDE_FULL_SESSION": "true",
    ...
  }
}
```

### Docker

Repository contains a Dockerfile for you to build your own Docker container with `docker build .` command. After building, you can run it with `docker run --rm <ID>` command. --rm is to remove the container once it finishes running.

Ready-built container is available from [Docker hub](https://hub.docker.com/r/ajmyyra/telltale/). If you really trust me, you can use it by typing `docker run --rm ajmyyra/telltale:v1` to whichever server you're wanting it to run in. 

### Kubernetes

You can run the ready-built container from Docker hub with following Pod spec.

```
apiVersion: v1
kind: Pod
metadata:
  name: telltale
  labels:
    type: debugging
spec:
  containers:
  - name: telltale
    image: ajmyyra/telltale:v1.1
    ports:
    - containerPort: 8080
  nodeSelector:
    development: ohyes
```

Pod spec contains specialised nodeSelector, so you don't accidentally put this into your production environment. Add label to your dev node by commanding `kubectl label nodes your-dev-node development=ohyes`.
