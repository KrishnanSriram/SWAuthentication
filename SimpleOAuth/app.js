const express = require('express');
const app = express();
const routes = require('./routes');
const simpleOauthModule = require('simple-oauth2');
const logger = require('morgan');
const authConfig = require('./config/authentication');

const oauth2 = simpleOauthModule.create(authConfig.solarwinds);

// Authorization uri definition
const authorizationUri = oauth2.authorizationCode.authorizeURL({
    redirect_uri: 'http://localhost:3000/auth/callback',
    scope: 'notifications',
    state: '3(#0/!~',
});

app.use(logger('dev'));
// app.use('/', routes);

// Initial page redirecting to Github
app.get('/auth', (req, res) => {
    console.log(`Login redirected to auth ${authorizationUri}`);
    res.redirect(authorizationUri);
});

// Callback service parsing the authorization token and asking for the access token
app.get('/auth/callback', (req, res) => {
    console.log('auth/callback invoked');
    const code = req.query.code;
    const options = {
        code,
    };

    oauth2.authorizationCode.getToken(options, (error, result) => {
        if (error) {
            console.error('Access Token Error', error.message);
            return res.json('Authentication failed');
        }

        console.log('The resulting token: ', result);
        const token = oauth2.accessToken.create(result);

        return res
            .status(200)
            .json(token);
    });
});

app.get('/success', (req, res) => {
    res.send('<h2>Success - Logged in without any issues</h2>');
});

app.get('/', (req, res) => {
    res.send('Hello<br><a href="/auth">Log in with SolarWinds</a>');
    // console.dir(authConfig.solarwinds);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is open: ${PORT}`);
});