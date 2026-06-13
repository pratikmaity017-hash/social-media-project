// same kaj bar bar korar dorkar nai tai middleware use kora hoyeche

import jwt from 'jsonwebtoken'

import config from '../config/config.js'

export async function authMiddleware(req , res , next) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Access denied. No token provided.",
            });
        }

        const decoded = jwt.verify(token, config.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({
            message: "Invalid token.",
        });
    }
}