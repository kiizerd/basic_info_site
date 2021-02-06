const express = require('express');
const app = express()
const fs = require('fs');
const router = express.Router();

const htmlfiles = fs.readdirSync("./pages", { withFileTypes: true })
                      .map(file => file.name);
const cssfiles = fs.readdirSync("./styles/", { withFileTypes: true })
                      .map(file => file.name);

let homepage = '/';
let page404;
fs.readFile('./pages/404.html', (err, data) => {
  page404 = data;
});

app.use(express.static('styles'));

htmlfiles.forEach(file => {
  let route = '/' + file.slice(0, -5);
  route = file == 'index.html' ? '/' : route;
  router.get(route, (req, res) => {
    fs.readFile(`./pages/${file}`, (err, data) => {
      if (err) {
        throw err
      } else {
        res.status(200).set('Content-Type', 'text/html');
        res.send(data);
        res.end()
      }
    })
  });
});

app.use('/', router)

app.listen(3000, () => {
  console.log('server started')
})
