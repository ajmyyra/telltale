# Telltale

Telltale responds to HTTP queries with every header, connection detail and env variable it can find in JSON format.

## Why?

When debugging load balancers, proxies, API gateways or orchestrators (Kubernetes, Mesos), you often need to find out what is getting through and how it looks like, or what environment variables is the container seeing. Sometimes you also need to debug your browser, to see if your ad blocker really adds that Do Not Track request header.

Telltale is for debugging these cases, or when you just need something to respond to your tests and that WordPress container just seems too big.

## How do I run this in production?

You don't. Seriously, don't. Leave a debug mode on for your production server if you wish to play with danger, but do not run this.

If you did and exposed your secrets, see licence's part where you can't hold me liable for any damages. You have been warned.

## Usage

Telltale comes with zero external requirements, so only Node.js is needed. Simplest way to run it is simply typing `npm start` in its folder on a server. Expect following results in response:

```
{
  "requestHeaders": {
    "host": "localhost:8080",
    "connection": "keep-alive",
    "cache-control": "max-age=0",
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

### Kubernetes