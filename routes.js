const express = require('express')
const urlController = require('./controllers/url')

const router = express.Router()


router.post('/add-url', urlController.addUrl)

router.get('/*', urlController.resolveUrl)

module.exports = router