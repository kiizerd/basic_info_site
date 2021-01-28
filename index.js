const http = require('http');
const port = process.env.PORT;
const url = require('url');
const fs = require('fs');

let homepage = './.html';
let page404;
fs.readFile('./pages/404.html', (err, data) => {
  page404 = data;
});

const server = http.createServer((req, res) => {
  let q = url.parse(req.url, true);
  let filename = "." + q.pathname;
  let requested_dir;

  if (filename.substr(-4) === '.css') { 
    requested_dir = "./styles/"
  } else {
    requested_dir = "./pages/"
    filename += '.html'
  }
  filename = filename === homepage ? 'index.html' : filename;
  
  console.log(`directory: ${requested_dir}`);
  console.log(`filename: ${filename}`);

  fs.readFile(requested_dir + filename, (err, data) => {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      res.end(page404);
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    }
  })

}).listen(3000);

