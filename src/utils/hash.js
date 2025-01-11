const crypto = require('crypto')

function hash(str, num) {
    const hash = crypto.createHash('sha256');
    hash.update(str)

    const last52Bits = hash.digest('hex').slice(-13)
    const bigNum = parseInt(last52Bits, 16);

    return bigNum % num;
}

module.exports = hash