import { Request, Response, Router } from 'express';
import { existsSync, readdirSync } from 'fs';
import { join } from 'path';

export const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.status(200).render('share/index', {
    page: 'Home'
  });
});

router.get('/download', (req: Request, res: Response) => {
  async function f() {
    try {
      let storageFound = await existsSync(
        join(__dirname, '..', '..', 'storage/')
      );
      let files = storageFound
        ? readdirSync(join(__dirname, '..', '..', 'storage/'))
        : [];
      res.status(200).render('share/download', {
        page: 'Download',
        files
      });
    } catch (e) {
      console.log(e);
    }
  }
  f();
});

router.get('/upload', (req: Request, res: Response) => {
  res.status(200).render('share/upload', {
    page: 'Upload'
  });
});
