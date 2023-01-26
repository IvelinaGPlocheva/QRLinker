let mongoose = require('mongoose');

let qrCodeSchema = new mongoose.Schema({
  message: {
    type: String,
    required: false,
    description: "The message associated with the QR code."
  },
  qrCode: {
    type: String,
    required: false,
    description: "the QR code generated."
  }
});

module.exports = mongoose.model('QRcode', qrCodeSchema);
