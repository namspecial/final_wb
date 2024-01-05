const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const { v4: uuidv4 } = require('uuid');
const Location = require("../models/location");
const { route } = require("./usersRoute");
const bookings = require("../models/booking");
const stripe = require('stripe')('sk_test_51OP7zpGt1wcJcbrqR0PNKFSOSqaLr2SczjRpLpgG0WEjVvwiGVmhBcOgr7Je3JNeoGrLWE25dmaOlJ73TVFCmYDt00n0ZoChqU');


router.post("/bookTour", async (req, res) => {
    console.log(req.body);
    const { locations,
        userid,
        fromdate,
        todate,
        totalamount,
        token
    } = req.body;
    try {

        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })
        const payment = await stripe.charges.create(
            {
                amount: totalamount * 100,
                customer: customer.id,
                currency: 'inr',
                receipt_email: token.email
            }, {

            idempotencyKey: uuidv4()
        }
        )
        res.send('Payment suscessfull, Your tour is booked')
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error })

    }

    try {
        let newBooking = Booking({
            location: locations.name,
            locationid: locations._id,
            userid,
            fromdate,
            todate,
            totalamount,
            transactionId: '1234'

        })
          const locationtemp = await Location.findOne({_id : locations._id })
          const booking = await newBooking.save()

          locationtemp.currentBookings.push({
              userid: userid,
              fromdate : fromdate,
              todate : todate,
              status: booking.status
  
  
  
          });
          await locationtemp.save()
        res.status(200).send('Booked successfull')

    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
        

    }

});

router.get("/getbookingsbyuserid/:userid", async (req, res) => {
    const userid = req.params.userid

    console.log(userid);
    try {
        const bookings = await Booking.find({ userid: userid })
        console.log(bookings);
        res.status(200).send(bookings)
    } catch (error) {
        return res.status(400).json({ error });
    }


});
router.post("/cancelBooking", async (req, res) => {
    const { userid, locationid } = req.body


    try {
        const bookingitem = await Booking.findOne({ _id: userid })
        bookingitem.status = 'canceled'
        await bookingitem.save()
        const location = await Location.findOne({ _id: locationid })
        console.log(location);
        const bookings = location.currentBookings
        const temp = bookings.filter(booking => booking.userid.toString() !== userid)
        location.currentBookings = temp
        await location.save()
        res.status(200).send('Your tour canceled suscessfully')
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error });

    }



})




module.exports = router