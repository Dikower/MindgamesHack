const express = require('express'); // eslint-disable-line import/no-commonjs
const compression = require('compression'); // eslint-disable-line import/no-commonjs
const path = require('path'); // eslint-disable-line import/no-commonjs
const httpProxy = require('http-proxy');
const livereload = require('easy-livereload');
const axios = require('axios');
const app = express();

function wwwRedirect(req, res, next) {
  if (req.headers.host.slice(0, 4) === 'www.') {
    let newHost = req.headers.host.slice(4);
    let destUrl = req.protocol + '://' + newHost + req.url;
    res.redirect(301, destUrl);
  } else {
    next();
  }
}

app.set('port', process.env.PORT || 3000);
app.set('trust proxy', true);
app.use(express.json());
app.use(compression());
app.use(wwwRedirect);
app.use(express.static("./public/"));

let proxy = httpProxy.createProxyServer({
  target: 'https://www.gokgs.com',
  changeOrigin: true
});

app.get('/json/access', function (req, res) {
  proxy.web(req, res);
});

app.post('/json/access', async function (req, res) {
  // console.log(req.body)
  // proxy.web(req, res);
  axios.post('https://www.gokgs.com/json/access', req.body)
    .then(r => res.send(r))
    .catch(err => res.send(err));

});

app.post('/json-cors/access', function (req, res) {
  proxy.web(req, res);
});

app.get('/json-cors/access', function (req, res) {
  proxy.web(req, res);
});

app.post('/ping', function (req, res) {
  res.send("hello");
})

app.get('/*', function (req, res) {
  let index = path.join('./public/', '/index.html');
  res.sendFile(index);
});


// console.log('Serving files from ' + path.join(__dirname, '../'));
// app.use(express.static(__dirname, 'public'));

// Listen for requests
let server = app.listen(app.get('port'), function () {
  let port = server.address().port;
  console.log('Server running at http://localhost:' + port);
});