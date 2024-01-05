const mongoose =require ("mongoose");
 
const bookingSchema = mongoose.Schema({

location : {
    type : String  , require : true
},
locationid : {
    type : String  , require : true
},
userid :{
    type : String  , require : true
},
fromdate : {
    type : String  , require : true
},
todate : {
    type : String  , require : true
},
totalamount : {
    type : Number  , require : true
},
transactionId : {
    type : String  , require : true
},
status : {
    type : String  , require : true, default : 'booked'
}

}, 
{
    timestamps : true,
})

const bookings = mongoose.model('bookings', bookingSchema);
module.exports = bookings