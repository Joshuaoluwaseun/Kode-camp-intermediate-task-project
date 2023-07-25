const http = require('node:http');
const host = "localhost";
const fs = require("node:fs");  
const path = require('path');
const port = 3000;

// Middleware function to log incoming requests
function logRequests(req, res, next) {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;

    console.log(`[${timestamp}] ${method} ${url}`);
    next(); 
  }

const requestListener = function(req, res) {
    
        // Use the logMiddleware for every incoming request
    logRequests(req, res, () => {
    if (req.url == '/') {
        res.writeHead(200,{'Content-Type': 'text/plain' });
        res.end("Hello Node.js!");
    }
    else if (req.url == '/file' && req.method === 'GET') {
        const filePath = path.join(__dirname, 'data.txt');

        // Read the data text file content
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
            return;
            }
    
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(data);
        });
    }

    else if (req.url === '/api/user' && req.method === 'GET') {
        res.writeHead(200,{'Content-Type': 'applicationj/json' });
        res.end(JSON.stringify({
            name: "daniel", 
            email: "dastiny123@gmail.com",
            age: 22
        }));
    }

    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end("Page not found");
    }
    })
}

const server = http.createServer(requestListener);

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

