const express = require('express')
const bodyParser = require('body-parser')
const atob = require('atob')
const btoa = require('btoa')
const path = require('path')
const mongoose = require('mongoose')

// ----------------------------------------------------------------------------------


const app = express()


//database connection here --------------------------------------------------------
mongoose.connect('mongodb://adjoa:summeryz1.@ds261570.mlab.com:61570/long_url')
    .then(() => {
        console.log('Connection to database successfull')
    })
    .catch(err => {
        console.error(err)
    })

app.use("/assets", express.static(path.join(__dirname, 'public/css')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'))
})
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/css/style.css'))
// })


const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})