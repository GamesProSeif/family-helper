const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const os = require('os');
const http = require('http');
const fs = require('fs');

const app = express();

// Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// Files API Router
app.use('/api/files', require(path.join(__dirname, 'routes', 'api', 'files')));

// Share Router
app.use('/share', require(path.join(__dirname, 'routes', 'pages', 'share')));

// Share redirects
app.get('/', (req, res) => res.status(200).redirect('/share'));
app.get('/download', (req, res) => res.status(200).redirect('/share/download'));
app.get('/upload', (req, res) => res.status(200).redirect('/share/upload'));

const PORT = process.env.PORT || 80;

let interfaces = os.networkInterfaces();
let ip;

if (interfaces['Ethernet']) {
  ip = interfaces['Ethernet'].filter(n => n.family == 'IPv4')[0].address;
}
else if (interfaces['Wi-Fi']) {
  ip = interfaces['Wi-Fi'].filter(n => n.family == 'IPv4')[0].address;
}
else {
  ip = undefined;
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

if (ip) {
  console.log(`Possibly hosting on ${ip}`);
  console.log(`Full domain: http://${ip}:${PORT}/`);
}
else {
  console.log('Couldn\'t find an ip, try doing "ipconfig" in the terminal and use the IPv4 ips there.');
}
