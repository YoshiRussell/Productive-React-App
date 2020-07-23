require('dotenv').config();
const jwt = require('jsonwebtoken');

// middleware that gets token from header
function auth(req, res, next) {
    const token = req.header('x-auth-token');

    // check for token
    if(!token) return res.status(403).json({ msg: 'Unauthorized' });

    try {
        // verify token
        const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);

        // add user from jwt payload
        req.user = decodedPayload;
        next();
    } catch(e) {
        res.status(400).json({ msg: 'Token is not valid' });
    }
}

module.exports = auth;