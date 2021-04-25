const jwt = require("jsonwebtoken");
const User = require('../database/user');

module.exports = function authenticateToken(req, res, next) {
    
    const token = req.cookies['JWT'];
    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
        console.log(err);
        if (err) {
            return res.sendStatus(403);
        }
        
        User.findOne({
            where: {
                id: payload.userId,
                email: payload.email
            }
        })
        .then(function(userModel) {
            req.currentUser = userModel;
            next();
        })
        .catch(next);
        
    });
};