const { validateContact, Contact } = require("../models/Contact");
const auth =  require("../middlewares/auth");

const mongoose = require('mongoose');
const router = require('express').Router();

const { required } = require('joi');


// const Contact = require("../models/Contact");



//create contact....
router.post("/contact", auth, async (req, res) => {

    const { error } =  validateContact(req.body);

    if(error) {
        return res.status(400).json({error: error.details[0].message})
    }

    try {

        
    } catch (err) {
        console.log(err);
        
    }
})


//fetch contact
router.get("/mycontacts", auth, async (req, res) => {
    try {
        const mycontacts = await Contact.find({ postedBy: req.user._id}).populate(
            "postedBy",
            ".password"
        );

        return res.status(200).json( { contacts: mycontacts });
        
    } catch (err) {
        console.log(err);        
    }

});


//update contact
router.put("/contact", auth, async (req, res) => {
    const { id } = req.body;

    if(!id) return res.status(400).json( { error: "no id specified. " });
    if(!mongoose.isValidObjectId(id))
        return res.status(400).json({ error: "please enter a valid id" });


    try {
        const contact = await contact.findOne({ _id: id });

        if(req.user._id.toString() !== contact.postedBy._id.toString())
            return res
                .status(401)
                .json({ error: "you can't edit other people contacts!"});

    const updatedData = { ...req.body, id: undefined };
    const result = await contact.findByIdAndUpdate( id, updatedData, {new: true});
    return res.status(200).json({ ...result._doc });
        
    } catch (err) {
        console.log(err);
        
    }
})

//delete contact
router.delete("/delete/:id",auth, async ( req, res ) => {
    const { id } = req.params;
    
    if(!id) return res.status(400).json( { error: "no id specified. " });

    if(!mongoose.isvalidObjectId(id))
        return res.status(400).json({ error: "please enter a valid id" });
    try {
        const contact = await contact.findOne( { _id: id });
        if(!contact) return res.status(400).json({ error: " no contact found" });

        if(req.user._id.toString() !== contact.postedBy._id.toString())
            return res
                .status(401)
                .json({ error: "you can't delete other people contacts!"});

        const result = await contact.deleteOne( { _id: id });


      return res.status(200).json({ ...contact._doc });

    } catch (err) {
        console.log(err);
        
    }

});




module.exports = router;
