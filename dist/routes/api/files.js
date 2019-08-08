"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const express_1 = require("express");
const fs_1 = require("fs");
const path_1 = require("path");
const formidableMiddleware = require("express-formidable");
exports.router = express_1.Router();
exports.router.use(express.static(path_1.join(__dirname, '..', '..', 'storage')));
exports.router.use(formidableMiddleware());
exports.router.post('/', (req, res) => {
    (async () => {
        try {
            let storageFound = await fs_1.existsSync(path_1.join(__dirname, '..', '..', 'storage/'));
            if (!storageFound) {
                await fs_1.mkdirSync(path_1.join(__dirname, '..', '..', 'storage/'));
            }
            let oldpath = req.files.filetoupload.path;
            let newpath = path_1.join(__dirname, '..', '..', 'storage', req.files.filetoupload.name);
            let writer = fs_1.createWriteStream(newpath);
            let reader = fs_1.createReadStream(oldpath);
            await reader.pipe(writer);
            res.status(200).render('share/done', {
                page: 'Uploaded',
                file: req.files.filetoupload.name
            });
        }
        catch (e) {
            console.log(e);
        }
    })();
});
