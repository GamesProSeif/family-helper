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
            let storageFound = await fs_1.existsSync(path_1.join(__dirname, '..', '..', 'storage/'));
            let files = storageFound
                ? fs_1.readdirSync(path_1.join(__dirname, '..', '..', 'storage/'))
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
