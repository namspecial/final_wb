const express = require("express");
const cors = require('cors');
const mongoose = require('./db')
const app = express();

app.use(cors());


const locationRoute = require('./routs/locationRoute');
const usersRoute = require ('./routs/usersRoute');
const bookingRouter = require ('./routs/bookingsRoute')
app.use(express.json())


app.use('/api/locations', locationRoute)
app.use('/api/users' , usersRoute)
app.use('/api/bookings', bookingRouter)
const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Node Server Started on port ', port));


