"use strict";

const mongoose = require('mongoose');

const urlSchema = mongoose.Schema({
    url: { type: String, required: true }, // Original URL submitted by the user
    token: { type: String, required: true } // The short URl generated
})

module.exports = mongoose.model('url', urlSchema);