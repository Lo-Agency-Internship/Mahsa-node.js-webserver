const http = require('http');
const path = require('path');
const fs = require('fs');




function requestResponseFunc(request,response){
    //console.log(request.url)

    let fileName = request.url;
    //console.log(fileName);

    
    let fileAddress = __dirname+"\\"+fileName.slice(1,);

    if (fileAddress === "./"){
        fileAddress = "./index.html";
    }
    let fileExtention = path.extname(fileAddress);
    //console.log(fileAddress);
    //console.log(fileExtention);


    let fileType = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        
    };

let contentType = fileType[fileExtention];

    fs.readFile(fileAddress,function(error,fileContent){
        if (error){
            response.writeHead(404)
            response.write("file not found")
            response.end()

        }

        response.writeHead(200,{"content-type":contentType});
        response.end(fileContent)
    })

}


let server = http.createServer(requestResponseFunc)
server.listen(3000);
console.log('I am listening');
