// tslint:disable: no-var-requires
import * as express from 'express';
import { networkInterfaces } from 'os';
import { join } from 'path';

const app = express();

// EJS Middleware
app.set('views', join(__dirname, '..', 'views/'));
app.set('view engine', 'ejs');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Files API Router
app.use('/api/files', require('./routes/api/files').router);

// Share Router
app.use('/share', require('./routes/pages/share').router);

// Share redirects
app.get('/', (req: express.Request, res: express.Response) =>
  res.status(200).redirect('/share')
);
app.get('/download', (req: express.Request, res: express.Response) =>
  res.status(200).redirect('/share/download')
);
app.get('/upload', (req: express.Request, res: express.Response) =>
  res.status(200).redirect('/share/upload')
);

const PORT = process.env.PORT || 80;

const interfaces = networkInterfaces();
let ip: string | undefined;

if (interfaces.Ethernet) {
  ip = interfaces.Ethernet.filter(n => n.family === 'IPv4')[0].address;
} else if (interfaces['Wi-Fi']) {
  ip = interfaces['Wi-Fi'].filter(n => n.family === 'IPv4')[0].address;
} else {
  ip = undefined;
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

if (ip) {
  console.log(`Possibly hosting on ${ip}`);
  console.log(`Full domain: http://${ip}:${PORT}/`);
} else {
  console.log(
    'Couldn\'t find an ip, try doing "ipconfig" in the terminal and use the IPv4 ips there.'
  );
}
