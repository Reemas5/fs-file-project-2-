const http = require('http');
const routes = require('./route');

const server = http.createServer(routes)
    
const port = 3000;
server.listen(port, () => {
    console.log('Server is running on port 3000');

});             


