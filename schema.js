import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  id: String,
  hotelName: String,
  hotelCity: String,
  comfortType: String,
  name: String,
  email: String,
  phoneNumber: String,
  address: String,
  aadhar: String,
  time: Date,
});

const HotelUsers = mongoose.model("HotelBookingUsers", userSchema)

export default HotelUsers