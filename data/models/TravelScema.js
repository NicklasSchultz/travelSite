var mongoose = require("mongoose");

var TravelSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true
  },
  images: {
    type: String,
    index: true
  },
  texts: {
    type: String,
    index: true
  }
},
{
	collection : 'trips'
});

var Trip = mongoose.model('Trip', TravelSchema);
module.exports = {
  Trip: Trip
}