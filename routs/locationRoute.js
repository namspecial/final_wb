const express = require("express");
const router = express.Router();

const locations = require('../models/location')


const getLocations = async (req, res) => {
    const data = await locations.find();

    if (data!=null) {       
        res.status(200).json(data)
    }else {
        res.status(500).json({message: "cannot get data"})
    }

  };


  const getLocationById = async (req, res) => {
    const locationId = req.params.locationId

    const data = await locations.findById(locationId);

    if (data!=null) {       
        res.status(200).json(data)
    }else {
        res.status(500).json({message: "cannot get data"})
    }

  };

router.get("/getalllocation", getLocations);
router.get("/getLocationById/:locationId", getLocationById);
router.post("/addPlaces" , async (req, res) => {
    try {
        const { name, maxCount, phoneNumber,price,imageUrls,type,description } = req.body;
        console.log(price);
        const currentBookings =[]
     let newPlace = new locations({
        name, maxCount, phoneNumber,price,imageUrls,currentBookings,type,description
     })
     console.log("sau khi add");
     console.log(newPlace);
     await newPlace.save()
     res.status(200).send('New place added successfully')
     
    } catch (error) {
     return res.status(500).json({ error });
 
     
    }
 
 })


 

module.exports = router;
