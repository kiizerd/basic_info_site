const http = require('http')
const fs = require('fs');

const htmlfiles = fs.readdirSync("./pages", { withFileTypes: true })
                      .map(file => file.name);

const cssfiles = fs.readdirSync("./styles/", { withFileTypes: true })
                      .map(file => file.name);

let homepage = '/';
let page404;
fs.readFile('./pages/404.html', (err, data) => {
  page404 = data;
});

const server = http.createServer((req, res) => {
  console.log('requested url: --V')
  let filename = req.url;
  let requested_dir;
  filename = filename === homepage ? 'index' : filename.substr(1);
  
  if (htmlfiles.includes(filename + '.html')) {
    console.log(`\n`, '--loading page--', `\n`)
    filename += '.html'
    requested_dir = "./pages/"
  } else if (cssfiles.includes(filename)) {
    console.log(`\n`, '--loading style--', `\n`)
    requested_dir = "./styles/"
  }
  
  console.log(`requesting==> ${requested_dir}${filename}`, ' ---')
  fs.readFile(requested_dir + filename, (err, data) => {
    if (err) {
      console.log(`--${filename} not found--`)
      res.writeHead(404, {'Content-Type': 'text/html'});
      res.end(page404);
    } else {
      if (requested_dir == "./pages/") {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      } else if (requested_dir == "./styles/") {
        res.writeHead(200, {'Content-Type': 'text/css'})
        res.write(data);
        res.end();
      }
    }
  })

})

server.listen(3000, () => {
  console.log('Server started! --- listening on port 3000')
});

