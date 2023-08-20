"use strict";

const express = require('express');
const Papa = require('papaparse');
const QRCode = require('../qr-code-schema.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const qrCodes = await QRCode.find();

        // Check if the user wants to export to CSV
        if (req.query.export === 'csv') {
            const csv = Papa.unparse(qrCodes.map(code => ({
                message: code.message,
                qrCode: code.qrCode
            })));

            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', 'attachment; filename=qr-codes.csv');
            return res.send(csv);
        }

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
