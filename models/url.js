'use strict'

const mongoose = require('mongoose')

const counterSchema = mongoose.Schema({
    _id: {type: String, required: true},
    seq: {type: Number, default: 0}
})

const counter = module.exports = mongoose.model('counter', counterSchema)

const urlSchema = new mongoose.Schema({
    _id: {type: Number, index: true, required: true},
    created_at : {type: Date, default: Date.now()},
    long_url: {type: String, required: true}
})

urlSchema.pre('save', (next) => {
    let doc: this
    counter.findByIdAndUpdate({ _id: 'url_count'}, { $inc: { seq: 1} }, (err, counter) => {
        if (err) 
            return next(err)
        doc._id = counter.seq
        doc.created_at = Date.now()
        next()
    })
})

const Url = module.exports = mongoose.model('URL', urlSchema)
