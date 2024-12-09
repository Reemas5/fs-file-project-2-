const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        
        fs.readFile('message', 'utf8', (err, data) => {
            const latestMessage = data ? data.trim() : '';
            res.setHeader('Content-Type', 'text/html');
            res.end(
                `<form action="/message" method="POST">
                    <p>${latestMessage}</p>
                    <label>Message:</label>
                    <input type="text" name="message" required></input>
                    <button type="submit">Send</button>
                </form>`
            );
        });
    } else if (url === '/message' && method === 'POST') {
        let dataChunks = [];
        req.on('data', (chunk) => {
            dataChunks.push(chunk);
        });

        req.on('end', () => {
            const combinedBuffer = Buffer.concat(dataChunks);
            const formData = combinedBuffer.toString().split('=')[1];
            

           
            fs.writeFile('message', formData, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                res.end();
            });
        });
    } else {
        res.statusCode = 404;
        res.end('Page not found');
    }
});

const port = 3000;
server.listen(port, () => {
    console.log('Server is running on port 3000');
});             


