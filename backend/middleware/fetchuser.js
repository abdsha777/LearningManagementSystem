var jwt = require('jsonwebtoken');
const signature = "SIGNATURE";

const fetchuser = (req, res, next) => {
    // get user from jwt and add id to request object
    const token = req.header('token')
    if (!token) {
        res.status(401).send({ error: "Access Denied" })
    }else{
        try {
            const data = jwt.verify(token, signature)
            req.user = data.user
            next();
        } catch (error) {
            res.status(401).send({ error: "Access Denied" })
        }
    }
}

module.exports = fetchuser