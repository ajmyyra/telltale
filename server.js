var http = require('http');
var url = require('url');
var qs = require('querystring');

const serverPort = process.env.LISTEN_PORT || 8080;
const serverIp = process.env.LISTEN_IP || '0.0.0.0';

const logTime = () => {
    const ct = new Date();
    return ct.toISOString();
}

const handleRequest = (req, res) => {
    console.log(logTime() + ' Processing request from ' + req.connection.remoteAddress + ' for ' + req.url);

    let respInfo = {};
    respInfo.remoteAddress = req.connection.remoteAddress;
    respInfo.remotePort = req.connection.remotePort;
    respInfo.requestHeaders = req.headers;
    respInfo.requestMethod = req.method;
    respInfo.requestUrl = req.url;
    
    if (req.method === 'GET' || req.method === 'DELETE') {
        respInfo.requestParams = url.parse(req.url, true).query;
        sendResponse(res, respInfo);
    }
    else { // POST or PUT
        let body='';
        req.on('data', (data) => {
            body += data;
        });
        req.on('end', () => {
            respInfo.requestParams = qs.parse(body);
            sendResponse(res, respInfo);
        });
    }
}

const sendResponse = (res, respInfo) => {
    if (process.env.envVars === 'true') respInfo.envVariables = process.env;

    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(respInfo, null, 2));
    res.end();
}

const server = http.createServer(handleRequest);
    
server.listen(serverPort, serverIp, () => {
    console.log(logTime() + ' Telltale server listening in IP ' + serverIp + ' and port ' + serverPort + '.');
});