"use strict";

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const QRCode = require('../qr-code-schema.js'); // import the schema

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'QR Code Generator' });
});


router.post('/update', (req, res) => {
    const qrCodeId = mongoose.Types.ObjectId(req.body.qrId);
    const updatedMessage = req.body.message;

    // Find the QR code by its id and update its message
    QRCode.findByIdAndUpdate(qrCodeId, { message: updatedMessage }, (err, qrCode) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/list');
    });
});
module.exports = router;
