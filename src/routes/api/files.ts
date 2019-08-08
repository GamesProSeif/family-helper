import * as express from 'express';
import { Request, Response, Router } from 'express';
import { existsSync, mkdirSync, createWriteStream, createReadStream } from 'fs';
import { join } from 'path';
import * as formidableMiddleware from 'express-formidable';

export const router = Router();

router.use(express.static(join(__dirname, '..', '..', 'storage')));

router.use(formidableMiddleware());

router.post('/', (req: Request, res: Response) => {
  (async () => {
    try {
      let storageFound = await existsSync(
        join(__dirname, '..', '..', 'storage/')
      );
      if (!storageFound) {
        await mkdirSync(join(__dirname, '..', '..', 'storage/'));
      }
      let oldpath = req.files.filetoupload.path;
      let newpath = join(
        __dirname,
        '..',
        '..',
        'storage',
        req.files.filetoupload.name
      );
      let writer = createWriteStream(newpath);
      let reader = createReadStream(oldpath);
      await reader.pipe(writer);
      res.status(200).render('share/done', {
        page: 'Uploaded',
        file: req.files.filetoupload.name
      });
    } catch (e) {
      console.log(e);
    }
  })();
});
