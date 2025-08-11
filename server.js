
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 8000;

const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.svg': 'image/svg+xml',
    '.xml': 'application/xml',
    '.txt': 'text/plain'
};

const server = http.createServer((req, res) => {
    let filePath = url.parse(req.url).pathname;
    
    // Handle root redirect
    if (filePath === '/') {
        res.writeHead(302, { 'Location': '/en/in-page' });
        res.end();
        return;
    }
    
    // Remove leading slash and resolve file path
    filePath = filePath.substring(1);
    
    // If no extension, assume it's an HTML file
    if (!path.extname(filePath)) {
        filePath += '.html';
    }
    
    // Resolve full file path
    const fullPath = path.join(__dirname, filePath);
    
    // Check if file exists
    fs.access(fullPath, fs.constants.F_OK, (err) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 - File Not Found</h1>');
            return;
        }
        
        // Read and serve file
        fs.readFile(fullPath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('<h1>500 - Internal Server Error</h1>');
                return;
            }
            
            const ext = path.extname(filePath);
            const contentType = mimeTypes[ext] || 'application/octet-stream';
            
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        });
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log('Press Ctrl+C to stop the server');
});
