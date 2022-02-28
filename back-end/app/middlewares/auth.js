require("dotenv").config();
const secret = process.env.SECRET;
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const withAuth = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if(!token){
        return res.status(401).json({message: "No token"});
    }

    try {
        jwt.verify(token, secret, (error, decoded) => {
            if(error){
                return res.status(401).json({message: "Token invalid"});
            }
            
            User.findOne({email: decoded.email}).then((user) => {
                req.user = user;
                next();
            }).catch((error) => {
                return res.status(401).json({ 
                    message: "User not found", 
                    error
                });
            })
            
        })
    } catch (error) {
        return res.status(401).json({ 
            message: "Could not authorize user", 
            error
        });
    }
}

module.exports = withAuth;