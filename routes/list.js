"use strict";

const express = require('express');

const QRCode = require('../qr-code-schema.js'); // import the schema

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const qrCodes = await QRCode.find();
        res.render('list', { qrCodes });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error retrieving QR codes');
    }
});

// Delete a QR code
router.post('/:id', (req, res) => {
    QRCode.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.redirect('/list');
        }
    });
});

module.exports = router;
