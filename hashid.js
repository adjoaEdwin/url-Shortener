const Hashids = require('hashids')
const hashids = new Hashids()

function encode(num) {
    return hashids.encode(num)
}

function decode(str) {
    return hashids.decode(str)
}

module.exports = encode
module.exports = decode


