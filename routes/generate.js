"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const crypto = require('crypto');
const mongoose = require('mongoose');
const https = require('https');
const qr = require('qr-image');

const QRcode = require('../qr-code-schema.js'); // import the schema

const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('generate', { title: 'QR Generator' });
});

// for parsing application/json
router.use(bodyParser.json());

// for parsing application/xwww-form-urlencoded
router.use(bodyParser.urlencoded({ extended: true }));

// for parsing multipart/form-data
router.use(upload.array());
router.use(express.static('public'));

router.post('/', async (req, res) => {
    try {
        const message = req.body.message;
        const url = `https://chart.googleapis.com/chart?cht=qr&chl=${encodeURIComponent(message)}&chs=180x180`;
        const qrCode = new QRcode({
            message: message,
            qrCode: url
        });
        await qrCode.save();
        console.log(url,"url");
        res.render('generate', { message, qr_code_url: url, title: 'QR Generator' });
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { message: 'Error generating QR code', title: 'QR Generator' });
    }
})

module.exports = router;
