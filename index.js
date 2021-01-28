const http = require('http');
const port = process.env.PORT;
const url = require('url');
const fs = require('fs');

let homepage = './.html';
let page404;
fs.readFile('./404.html', (err, data) => {
  page404 = data;
});

const server = http.createServer((req, res) => {
  let q = url.parse(req.url, true);
  let filename = "." + q.pathname + '.html';
  filename = filename === homepage ? './index.html' : filename
  console.log(`filename: ${filename}`);

  fs.readFile("./pages/" + filename, (err, data) => {
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

