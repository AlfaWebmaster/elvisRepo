const mongoose = require('mongoose');
const { collection } = require('./user');

const gptSchema = new mongoose.Schema({
    nombreLink : String,
    enlace: String,
    permiso: String
}, {collection: 'gpt'});

module.exports = mongoose.model('Gpt', gptSchema);