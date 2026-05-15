const http = require('http');

/*function requestListener(req,res){
    console.log(req);   
}*/

const server = http.createServer( (req,res) =>{
    console.log(req.url,req.method,req.headers);
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>MY FIRST PAGE</title></head>');
    res.write('<body><h1>hello kitty</h1></body> ');
    res.write('</html>');
    res.end();

   
});
const PORT =3000;
server.listen(PORT, () => {
    console.log(`Server running on address http://localhost: ${PORT}`);
});