const router = require('express').Router();
const request = require('request');
require('dotenv').config();

router.route('/').post((req, res) => {

    const { user } = req.body;

    request({
        method: 'POST',
        url: 'https://dev-lkenkzaj.us.auth0.com/oauth/token',
        headers: { 'content-type': 'application/json' },
        body: `{"client_id":${process.env.AUTH0_CLIENT_ID},"client_secret":${process.env.AUTH0_CLIENT_SECRET},"audience":"https://dev-lkenkzaj.us.auth0.com/api/v2/","grant_type":"client_credentials"}`,
    }, (error, response, body) => {
        if (error) {
            console.log("Error request accesstoken");
            res.json(error);
        } else {
            const accessToken = JSON.parse(body).access_token;
            request({
                method: 'GET',
                url: `https://dev-lkenkzaj.us.auth0.com/api/v2/users/${user.sub}`,
                headers: { authorization: `Bearer ${accessToken}` }
            }, (error, response, newbody) => {
                if(error) {
                    console.log("Error using accessToken");
                    res.json(error);
                } else {
                    const googleAccessToken = JSON.parse(newbody).identities[0].access_token; 
                    res.json(googleAccessToken);
                }
            });
        }
    }); 
});

module.exports = router;