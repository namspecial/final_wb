const mongoose = require('mongoose');

const tourSchema = mongoose.Schema({

name : {
    type: String,
    required: true

},
maxCount : {
    type: Number,
    required: true
},
phoneNumber : {
    type: String,
    required : true
},

price : {
    type: Number,
    required : true
},
imageUrls : [],
currentBookings : [],
type : {
    type: String,
    required: true
},
description : {
    type: String,
    required : true
}
    

}  )


const locations = mongoose.model('locations',  tourSchema)
module.exports = locations 