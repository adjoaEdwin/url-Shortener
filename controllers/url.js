const URL = require('../models/URL')
const randomString = require('randomstring')

module.exports = {
    addUrl: (req, res) => {
        const { url } = req.body;

        if(!url){
            return res.render('url-error')
        }

        const newURL = new URL({
            url, token: randomString.generate(5)
        })

        newURL.save((err, url)=> {
            if(err) return res.render('url-error')

            res.render('url-success', {
                token: url.token,
                link: "http://localhost:3000/"
            });

        })
    },

    resolveUrl: (req, res) => {
        let token = req.url.slice(1) // Extracting token from URL

        URL.findOne({ token }, (err, url) => {
            if(err){
                return res.render('url-error')
            }

            if(!url){
                return res.render('url-not-found')
            }


            if(url.url.slice(0, 4) === 'http'){  
             return res.status(301).redirect(url.url)
            }


            return res.status(301).redirect(`https://${url.url}`)

        })
    }
}
