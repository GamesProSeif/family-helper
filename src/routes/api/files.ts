import { Request, Response, Router, static as eStatic } from 'express';
import * as formidableMiddleware from 'express-formidable';
import { createReadStream, createWriteStream, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

export const router = Router();

router.use(eStatic(join(__dirname, '..', '..', '..', 'storage')));

router.use(formidableMiddleware());

router.post('/', (req: Request, res: Response) => {
  (async () => {
    try {
      const storageFound = await existsSync(
        join(__dirname, '..', '..', '..', 'storage/')
      );
      if (!storageFound) {
        await mkdirSync(join(__dirname, '..', '..', '..', 'storage/'));
      }
      const oldpath = req.files.filetoupload.path;
      const newpath = join(
        __dirname,
        '..',
        '..',
        '..',
        'storage',
        req.files.filetoupload.name
      );
      const writer = createWriteStream(newpath);
      const reader = createReadStream(oldpath);
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
