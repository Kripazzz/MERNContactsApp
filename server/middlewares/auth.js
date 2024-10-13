// const jwt = require('jsonwebtoken');

const jwt = require('jsonwebtoken');

const User = require('../models/User'); 

module.exports = async  (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

        jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
            if (err) {
                return res.status(401).json({ error: "Unauthorized" }); // Handle invalid token
            }

            try {
                const user = await User.findOne({ _id: payload._id }).select("-password"); // Ensure correct model
                if (!user) {
                    return res.status(404).json({ error: "User not found" }); // Handle case where user is not found
                }

                req.user = user; // Attach user to request object
                next(); // Proceed to the next middleware/route handler
            } catch (error) {
                console.error("Error finding user:", error);
                return res.status(500).json({ error: "Server error" }); // Handle server error
            }
        });
    } else {
        return res.status(403).json({ error: "Forbidden: No token provided" }); // No token in request
    }
};

















