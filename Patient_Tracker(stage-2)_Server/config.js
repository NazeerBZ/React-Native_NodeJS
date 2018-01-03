const jwt = require('jwt-simple');

module.exports = {
    secret: 'Mqwsj32309123kjlsdjfljsdf',
    tokenForUser: function (foundedUser) {
        const timesStamp = new Date().getTime();
        return jwt.encode({ sub: foundedUser.id, iat: timesStamp }, this.secret);
    }
}