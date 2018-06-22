'use strict'

const mongoose = require('mongoose')

const counterSchema = new mongoose.Schema({
    _id : {type: String, required: true},
    count: {type: Number, default: 0}
})

const Counter = module.exports = mongoose.model('Counter', counterSchema)


const urlSchema = new mongoose.model({
    _id : {type: String},
    url : '',
    created_at : '' 
})

urlSchema.pre('save', (next) => {
    console.log('Running pre-save')
    let doc = this
    Counter.findByIdAndUpdate({_id: 'url_count'}, { $inc: {count: 1}}, (err, counter) => {
        if(err) return next(err)
        console.log(counter)
        console.log(counter.count)
        doc._id = counter.count
        doc.created_at = new Date
        console.log(doc)
        next()
    })
})

const URL = module.exports = mongoose.model('URL', urlSchema)