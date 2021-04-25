const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const authRouter = express.Router();
const User = require('../database/user');

authRouter.post('/createUser', (req, res, next) => {

    bcrypt.hash(req.body.password, 10, function(err, hash) {

        if(err) {
            return next(err);
        }
        
        User.create({
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            email: req.body.email,
            role_id: 4,
            avatar_url: '',
            password_hash: hash,
        })
        .then(function(userModel) {
            console.log(`Created new user: ${JSON.stringify(userModel)}`);

            const jwtPayload = { userId: userModel.id, email: userModel.email};
            const token = jwt.sign(jwtPayload, process.env.JWT_SECRET_KEY, { expiresIn: 3600 });

            res.cookie('JWT', token);
            res.status(200)
                .json(userModel);
        })
        .catch(next);

        
    });

    
});

authRouter.post("/login", async (req, res, next) => {
    
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({
        where: {
            email: email
        }
    })
    .then(function(userModel) {
        if(!userModel) {
            return res.status(401).json({ error: 'User not found'});
        }

        bcrypt.compare(password, userModel.password_hash, function(err, success) {
            if(err || !success) {
                return res.status(401).json({ error: 'User not found'});
            }
            
            console.log(`Logged in as: ${JSON.stringify(userModel)}`);

            const jwtPayload = { userId: userModel.id, email: userModel.email};
            const token = jwt.sign(jwtPayload, process.env.JWT_SECRET_KEY, { expiresIn: 3600 });
            res.cookie('JWT', token);
            res.status(200).json(userModel);
          });
    })
    .catch(next);
    
    
  });

  authRouter.post("/logout", async (req, res, next) => {
    res.cookie('JWT', '');
    res.status(200).end();
  });

module.exports = authRouter;