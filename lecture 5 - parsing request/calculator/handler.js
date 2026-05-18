const {sumRequestHandler} = require('./sum');


const requestHandler =( req,res) => {
    console.log(req.url,req.method);
    if (req.url === '/'){
        res.setHeader('Content-Type', 'text/html');
        res.write(`
            <html>
               <head><title>Practice Set </title></head>
               <body>
                  <h1>Welcome to calculator</h1>
                  <a href="/calculator">Go To Calculator</a>
                </body>
            </html>
               

        `);
        return res.end();
    } else if (req.url.toLowerCase() === "/calculator"){
        res.setHeader('Content-Type', 'text/html');
        res.write(`
            <html>
               <head><Title>Practice Set </title></head>
               <body>
                  <h1>Here is the calculator</h1>
                  <form action = "/calculator-result" method="POST">

                   <input type ="text" placeholder="First Num" name="first" />
                   <input type ="text" placeholder="Second Num" name="second"/>
                   <input type="submit" value = "sum">

                  </form>
                </body>
            </html>
               

        `);
         return res.end(); 

    }else if  (req.url.toLowerCase() === "/calculator-result"&& req.method === 'POST'){
        return sumRequestHandler(req,res);
       // retutn sumRequestHandler(req,res); 
    }   



    res.setHeader('Content-Type', 'text/html');
        res.write(`
            <html>
               <head><Title>Practice Set </title></head>
               <body>
                  <h1>404 Page Does not Exist</h1>
                  <a href="/">Go To Home</a>
                </body>
            </html>
               

        `);
        return res.end();

} 
// exports.requestHandler = requestHandler; 

module.exports = { requestHandler };