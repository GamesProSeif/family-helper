import * as express from 'express';
import * as open from 'open';
import { join } from 'path';
import { router as filesRouter } from './routes/api/files';
import { router as pagesRouter } from './routes/pages/share';
import getIp from './util/getIp';
import { logger } from './util/logger';

process.title = 'Family Helper';

const app = express();

// EJS Middleware
app.set('views', join(__dirname, '..', 'views/'));
app.set('view engine', 'ejs');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Files API Router
app.use('/api/files', filesRouter);

// Share Router
app.use('/share', pagesRouter);

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

app.listen(PORT, () => {
  const ipAddress = getIp();

  ipAddress.forEach(ip => {
    logger.info(`Network "${ip.name}": http://${ip.address}:${PORT}`);
  });

  if (process.argv.slice(2).includes('open')) open(`http://localhost:${PORT}`);
});
