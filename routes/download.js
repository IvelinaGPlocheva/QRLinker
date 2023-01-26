"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const crypto = require('crypto');
const mongoose = require('mongoose');
const https = require('https');
const qr = require('qr-image');

const QRCode = require('../qr-code-schema.js'); // import the schema

const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('download', { title: 'Download a QR code' });
});

// for parsing application/json
router.use(bodyParser.json());

// for parsing application/xwww-form-urlencoded
router.use(bodyParser.urlencoded({ extended: true }));

// for parsing multipart/form-data
router.use(upload.array());
router.use(express.static('public'));

router.get('/', (req, res, next) => {
    const message = req.query.message;
    const qr_code = qr.image(message, { type: 'png' });
    res.setHeader('Content-type', 'image/png');
    res.setHeader('Content-disposition', 'attachment; filename=qr_code.png');
    qr_code.pipe(res);
});

module.exports = router;
