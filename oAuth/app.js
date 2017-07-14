const express = require('express');
const app = express();
const routes = require('./routes');
const OAuth2 = require("oauth").OAuth2;
const logger = require('morgan');
const authConfig = require('./config/authentication');

const oauth2 = new OAuth2(authConfig.solarwinds.client.id,
    authConfig.solarwinds.client.secret,
    authConfig.solarwinds.auth.tokenHost,
    authConfig.solarwinds.auth.authorizePath,
    authConfig.solarwinds.auth.tokenPath,
    null); /** Custom headers */

// Authorization uri definition
const authURL = oauth2.getAuthorizeUrl({
    redirect_uri: 'http://localhost:3000/auth/callback',
    scope: ['repo', 'user'],
    state: 'simletext'
});

app.use(logger('dev'));

// Initial page redirecting to Github
app.get('/auth', (req, res) => {
    console.log(`Login redirected to auth ${authURL}`);
    res.redirect(authURL);
});

// Callback service parsing the authorization token and asking for the access token
app.get('/auth/callback', (req, res) => {
    console.log('auth/callback invoked');
    const code = req.query.code;
    const options = {
        code,
    };


    oauth2.getOAuthAccessToken(
        qsObj.code, { 'redirect_uri': 'http://localhost:3000/success/' },
        function(e, access_token, refresh_token, results) {
            if (e) {
                console.log(e);
                res.end(e);
            } else if (results.error) {
                console.log(results);
                res.end(JSON.stringify(results));
            } else {
                console.log('Obtained access_token: ', access_token);
                res.end(access_token);
            }
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