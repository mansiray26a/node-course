const http = require('http');

const server = http.createServer((req,res) =>
{
    console.log(req.url,req.method);

    res.setHeader('Content-Type', 'text/html');


    if (req.url === '/home'){
        res.write('<h1>Welcome to Home</h1>');
        return res.end();
    } else if (req.url === '/men'){
        res.write('<h1>Welcome to Men</h1>');
        return res.end();

    }else if (req.url === '/women'){
        res.write('<h1>Welcome to Women</h1>');
        return res.end();

    }else if (req.url === '/kids'){
        res.write('<h1>Welcome to Kids</h1>');
        return res.end();

    }else if (req.url === '/cart'){
        res.write('<h1>Welcome to Cart</h1>');
        return res.end();

    }











    res.write(`
        <html lang="en">
<head>
    
    <title>MYNTRA</title>
</head>
<body>
  
    <nav>
        <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/men">Men</a></li>
            <li><a href="/women">Women</a></li>
            <li><a href="/kids">kids</a></li>
            <li><a href="/cart">Cart </a></li>
        </ul>
    </nav>
  
</body>
</html>
    
        
        
        `);

    res.end();


});

server.listen(4000,() =>{
    console.log('Server running on address http://localhost:4000');
});
