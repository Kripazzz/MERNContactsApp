const mongoose = require("mongoose");


const joi  = require('joi');

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required."]
    },
    address: {
        type: String,
        required: [true, "address is required."]
    },
    email: {
        type: String,
        required: [true, "email is required."]

    },
    phone: {
        type: Number,
        required: [true, " Phone Number is required."]
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",

    },
});


const Contact = new mongoose.model("Contact", ContactSchema);

const validateContact = (data) => {

    const schema = joi.object({
        name: joi.string().min(4).max(50).required(),
        address: joi.string().min(4).max(100).required(),
        email: joi.string().email().required(),
        phone: joi.number().min(10).less(10000000000).required(),

    })

    return schema.validate(data);

};

module.exports = {
    validateContact,
    Contact,
};