require("dotenv").config({ path: "./config/config.env" });




const express = require('express');
const morgan = require('morgan');

const connectDB = require('./config/db');

const auth = require("./middlewares/auth");




const app = express();




// Middleware (if needed)
app.use(express.json());
app.use(morgan("tiny"));




// Routes (if needed)
app.get("/protected", auth, (req, res) => {
    return res.status(200).json({ ...req.user._doc });
});

const cors = require('cors');
app.use(cors());

app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/contact"));

// Server configuration
const PORT = process.env.PORT || 8000;
app.listen(PORT, async() => {
    try {
        await connectDB();
        console.log(`Server listening on port: ${PORT}`);
        
    } catch (err) {
        console.log(err);
        
    }
   
   
});
