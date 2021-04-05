const express = require('express'); // eslint-disable-line import/no-commonjs
const cors = require('cors')
const compression = require('compression'); // eslint-disable-line import/no-commonjs
const path = require('path'); // eslint-disable-line import/no-commonjs
const httpProxy = require('http-proxy');
const axios = require('axios');
axios.defaults.withCredentials = true
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
app.options('*', cors())

app.use(express.json());
app.use(compression());
app.use(wwwRedirect);
app.use(express.static(path.join(__dirname, "public")));

app.use(function (req, res, next) {
  res.header('Content-Type', 'application/json;charset=UTF-8')
  res.header('Access-Control-Allow-Credentials', true)
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

let proxy = httpProxy.createProxyServer({
  target: 'https://www.gokgs.com',
  changeOrigin: true
});

app.get('/json/access', function (req, res) {
  proxy.web(req, res);
});

app.post('/getToken', function (req, res) {
  axios.post('https://www.gokgs.com/json/access', req.body)
    .then(r => res.json({cookie: r.headers['set-cookie'][0]}))
    .catch(err => res.send(err));
});

app.post('/json/access', async function (req, res) {
  axios.post('https://www.gokgs.com/json/access', req.body)
    .then(r => res.send(r))
    .catch(err => res.send(err));
});


app.post('/ping', function (req, res) {
  res.send("hello");
});

app.get('/*', function (req, res) {
  let index = path.join(__dirname, 'public', 'index.html');
  res.sendFile(index);
});


// Listen for requests
let server = app.listen(app.get('port'), function () {
  let port = server.address().port;
  console.log('Server running at http://localhost:' + port);
});