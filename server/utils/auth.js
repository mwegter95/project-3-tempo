const jwt = require("jsonwebtoken");

const secret = "mysecretshh";
const expiration = "2h";

module.exports = {
    // only the user id will be readable from the jsonwebtoken
    // use context.user._id to search for user in resolvers when needed
    signToken: function({ _id }) {
        const payload = { _id };
        return jwt.sign({ data: payload}, secret, { expiresIn: expiration });
    },
    authMiddleware: function({ req }) {
        let token = req.body.token || req.query.token || req.headers.authorization
        // if the token is sent via headers, separate "Bearer" from "<tokenvalue>"
        if(req.headers.authorization) {
            token = token.split(" ").pop().trim();
        }
        // if there's no token, return the object as is
        if(!token) {
            return req;
        }

        try {
            // decode and attach user data to request object
            // if jwt.verify secret doesn't match jwt.sign(), the object won't be decoded
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log("Invalid token");
        };

        return req;
    }
};