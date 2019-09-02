import { Request, Response, Router } from 'express';
import { existsSync, readdirSync, unlinkSync } from 'fs';
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

router.get('/delete', (req: Request, res: Response) => {
  (async () => {
      try {
          let file = req.query.file;
          if(!file) return;
          let dfile = await join(__dirname, '..', '..', 'storage', file);
          if(!existsSync(dfile)) return res.send("File not found.");
           unlinkSync(dfile);
           res.render('share/deletingdone.ejs', {
               page: 'Deleted successfully.'
           });
       }
       catch (e) {
           console.log(e);
       }
  })();
});
