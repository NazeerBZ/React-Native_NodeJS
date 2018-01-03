const crypto = require('crypto');

 algorithm = 'aes-256-ctr',
 password = 'd6F3Efeq';

module.exports = {
    encrypt: function encrypt(myPass) {
        var cipherObj = crypto.createCipher(algorithm, password);
        var encryptedStr = cipherObj.update(myPass, 'utf8', 'hex')
        encryptedStr += cipherObj.final('hex');
        return encryptedStr;
    },

    decrypt: function decrypt(myPass) {
        var decipherObj = crypto.createDecipher(algorithm, password);
        var decryptedStr = decipherObj.update(myPass, 'hex', 'utf8')
        decryptedStr += decipherObj.final('utf8');
        return decryptedStr;
    }
}