const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose')
const logger = require('morgan')
const routes = require('./routes')
require('dotenv').load({ path: '.env'})


// ----------------------------------------------------------------------------------
if (process.env.MODE == 'development') {
	require('dotenv').config();

const app = express()


//database connection here --------------------------------------------------------
mongoose.connect(process.env.MONGODB_URI ||'mongodb://adjoa:summeryz1.@ds261570.mlab.com:61570/long_url')
    .then(() => {
        console.log('Connection to database successfull')
    })
    .catch(err => {
        console.error(err)
    })


app.use(logger('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static(path.join(__dirname, '/public/')))
app.use('/css', express.static(path.join(__dirname, '/node_modules/bulma/css')))
app.use('/assets', express.static(path.join(__dirname, 'public/css')))
app.use('/assets', express.static(path.join(__dirname, 'public/imgs')))
app.set('views', './src/views')
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})

app.use(routes);


const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})