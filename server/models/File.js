const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    urlCode: String,
    fileUrl: String,
    image: String,
    date: { type: String, default: Date.now }
});

module.exports = mongoose.model('File', fileSchema);
