const http = require('http');
const server  = http.createServer((req,res)=>{
    console.log("server is created");
    
    res.setHeader('Content-Type','text/html')
    if(req.url =='/Home'){
        res.end("<h2>Welcome home</h2>")
    }
    if(req.url =='/About'){
        res.end("<h2>Welcome to About Us</h2>")
    }
    if(req.url =='/Node'){
        res.end("<h2>Welcome to my Node.Js project</h2>")
    }
    else{
        res.end("<h2>Page not Found</h2>")
    }


})

let port = 4000
server.listen(port,()=>{
    console.log('server is running')
})
