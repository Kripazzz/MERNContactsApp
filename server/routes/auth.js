const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); 




const auth = require("../middlewares/auth");







// Register User
router.post("/register", async (req, res) => {
    console.log("Incoming Register Request:", req.body); // Debugging log

    const { name, email, password } = req.body;

    // Checking for missing fields
    if (!name || !email || !password) {
        return res.status(400).json({ error: "Please enter all required fields" });
    }

    // Name validation
    if (name.length > 25) {
        return res.status(400).json({ error: "Name can only be less than 25 characters" });
    }

    // Email validation
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailReg.test(email)) {
        return res.status(400).json({ error: "Please enter a valid email address." });
    }

    // Password validation
    if (password.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters long." });
    }

    try {
        const doesUserAlreadyExist = await User.findOne({ email });
        if (doesUserAlreadyExist) {
            return res.status(400).json({ error: `User with email [${email}] already exists` });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ name, email, password: hashedPassword });
        const result = await newUser.save();

        result._doc.password = undefined; // Remove password before sending the response

        return res.status(201).json({ ...result._doc });
    } catch (err) {
        console.error("Register Error:", err); // Log the error for debugging
        return res.status(500).json({ error: err.message });
    }
});

// Login User
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Please enter all the required fields" });
    }

    // Email validation
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailReg.test(email)) {
        return res.status(400).json({ error: "Please enter a valid email address." });
    }

    try {
        const doesUserExist = await User.findOne({ email });
        if (!doesUserExist) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const doesPasswordMatch = await bcrypt.compare(password, doesUserExist.password);
        if (!doesPasswordMatch) {
            return res.status(400).json({ error: "Invalid email or password." });
        }

        const payload = { _id: doesUserExist._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1hr" });


        const user = {...doesUserExist._doc, password: undefined};
        return res.status(200).json({ token, user });

    } catch (err) {
        console.error("Login Error:", err);
        return res.status(500).json({ error: err.message });
    }
});



router.get("/me", auth, async (req, res ) => {
   return res.status(200).json({ ...req.user });
} )

module.exports = router;






























