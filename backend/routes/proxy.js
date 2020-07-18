const router = require('express').Router();
const request = require('request');

router.route('/').post((req, res) => {

    const { user } = req.body;

    request({
        method: 'POST',
        url: 'https://dev-lkenkzaj.us.auth0.com/oauth/token',
        headers: { 'content-type': 'application/json' },
        body: '{"client_id":"XaGNysAoOHYNaoSX5G1NSwkORI02UmS0","client_secret":"ubYbzY1M5M4SNH0MLsasgln4E-Tdk1HqWBn0PsCR1aNRFv22T-QMeoIX9ZamWc53","audience":"https://dev-lkenkzaj.us.auth0.com/api/v2/","grant_type":"client_credentials"}',
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