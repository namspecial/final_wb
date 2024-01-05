const express = require("express");
const router = express.Router();
const User = require("../models/user");


router.post("/register", async (req, res) => {

   console.log("data from client", req.body);
   try {
      const { name, email, password } = req.body;

      let user = await User.findOne({ email });

      if (user)
         return res.status(400).json("User with the given email already exist...");

      if (!name || !email || !password)
         return res.status(400).json("All fields are required");

      if (!email)
         return res.status(400).json("Email must be a valid email");

      user = new User({ name, email, password });

      await user.save();

      res.status(200).json({ _id: user._id, name, email });
   } catch (error) {
      res.status(500).json(error);
   }

});


router.post("/login", async (req, res) => {
   const { email, password } = req.body
   try {
      console.log("data from client", req.body);
      let user = await User.findOne({ email})
      console.log(JSON.stringify(user));
      if (user) {
        if (password == user.password) {
            res.status(200).json(user)
        } else {
         return res.status(400).json({ message: 'Mat khau sai' });
        }
      }
      else {
         return res.status(400).json({ message: 'Login faield' });
      }
   } catch (error) {
      return res.status(400).json({ error: error });
   }

});
const getallusers = async (req, res) => {
   const data = await User.find();

   if (data!=null) {       
       res.status(200).json(data)
   }else {
       res.status(500).json({message: "cannot get data"})
   }

 };

router.get('/getallusers', getallusers);  




module.exports = router

