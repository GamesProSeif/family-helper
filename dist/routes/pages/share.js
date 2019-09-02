"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = require("fs");
const path_1 = require("path");
exports.router = express_1.Router();
exports.router.get('/', (req, res) => {
    res.status(200).render('share/index', {
        page: 'Home'
    });
});
exports.router.get('/download', (req, res) => {
    async function f() {
        try {
            const storageFound = await fs_1.existsSync(path_1.join(__dirname, '..', '..', '..', 'storage/'));
            const files = storageFound
                ? fs_1.readdirSync(path_1.join(__dirname, '..', '..', '..', 'storage/'))
                : [];
            res.status(200).render('share/download', {
                page: 'Download',
                files
            });
        }
        catch (e) {
            console.log(e);
        }
    }
    f();
});
exports.router.get('/upload', (req, res) => {
    res.status(200).render('share/upload', {
        page: 'Upload'
    });
});
exports.router.get('/delete', (req, res) => {
    (async () => {
        try {
            const file = req.query.file;
            if (!file)
                return;
            const dfile = await path_1.join(__dirname, '..', '..', '..', 'storage', file);
            if (!fs_1.existsSync(dfile))
                return res.send('File not found.');
            fs_1.unlinkSync(dfile);
            res.render('share/deletingdone.ejs', {
                page: 'Deleted successfully.'
            });
        }
        catch (e) {
            console.log(e);
        }
    })();
});
