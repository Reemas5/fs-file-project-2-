const http = require('http');
const fs = require('fs');
const server  = http.createServer((req,res)=>{
console.log("server is created");
const url = req.url;
const method = req.method;
if (req.url==='/'){
    res.setHeader('Content-Type','text/html');
    res.end(
        `<form action="/message" method="POST">
            <label>Name:</label>
            <input type="text" name="username"></input>
            <button type="submit">Add</button>
        </form>`
        )
} else {
    if (req.url==='/message'){
        res.setHeader('Content-Type','text/html');
        let datachunks =[]
        req.on('data',(chunks)=>{
            console.log(chunks);
            datachunks.push(chunks)
            
        })
        req.on('end',()=>{
            let combinedbuffer = Buffer.concat(datachunks);
            console.log(combinedbuffer.toString())
            let value = combinedbuffer.toString()
            let formdata = value.toString().split("=")[1]
            fs.writeFile('formdata.txt',formdata,(err)=>{
                    res.statusCode= 302
                    res.setHeader('Location','/')
                    res.end()
            })
        })
    }
    else{
        if(req.url ==='/read'){
            fs.readFile('formdata.txt',(err,data)=>{
                console.log(data.toString())
                res.end(`<h1>${data.toString()}</h1>`)
            })
        }

    }
} 

})



let port = 3000
server.listen(port,()=>{
    console.log('server is running')
})
