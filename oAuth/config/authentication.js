const config = {
    solarwinds: {
        client: {
            id: '',
            secret: '',
        },
        auth: {
            tokenHost: 'https://app.ri.logicnow.com/',
            tokenPath: 'oauth/token',
            authorizePath: 'oauth/authorize',
        }
    }
}
module.exports = config;