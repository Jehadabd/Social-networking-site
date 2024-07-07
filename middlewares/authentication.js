const jwt = require('jsonwebtoken')
const check = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token) {
            res.status(401).json({ message: 'Unauthorized1' })

        }
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            req.currentUser = payload

            next()


        
    }
    catch (e) {
        res.status(500).json({
            e: e
        })
    }
}
module.exports = check