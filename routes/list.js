"use strict";

const express = require('express');

const QRcode = require('../qr-code-schema.js'); // import the schema

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const qrCodes = await QRcode.find();
        res.render('list', { qrCodes });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error retrieving QR codes');
    }
});

module.exports = router;
