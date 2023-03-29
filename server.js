import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import axios from "axios";
import bodyParser from "body-parser";
import cors from "cors";
import HotelUsers from "./schema.js";
const app = express();

dotenv.config();

const password = process.env.DB_PASSWORD;
const username = process.env.DB_USERNAME;

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const initializeAndConnectMongoDb = async () => {
  const url = `mongodb://${username}:${password}@ac-qjzmqen-shard-00-00.umu3oga.mongodb.net:27017,ac-qjzmqen-shard-00-01.umu3oga.mongodb.net:27017,ac-qjzmqen-shard-00-02.umu3oga.mongodb.net:27017/?ssl=true&replicaSet=atlas-mori02-shard-0&authSource=admin&retryWrites=true&w=majority`;
  try {
    await mongoose.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Database Connected");
  } catch (error) {
    console.log(`Error in Connecting Database ${error}`);
  }
};

initializeAndConnectMongoDb();
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port no ${PORT}`);
});

app.post("/bookings", async (request, response) => {
  const data = request.body;
  const newUser = new HotelUsers(data);

  try {
    await newUser.save();
    response.status(201).json(newUser);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
});

app.get("/cart", async (request, response) => {
  try {
    const data = await HotelUsers.find({});
    // console.log(data);
    response.status(200).json(data);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
});

app.delete("/:id", async (request, response) => {
  const id = request.params.id;
  try {
    await HotelUsers.deleteOne({ _id: id });
    response.status(204).json({ message: "Deleted Successfully" });
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
});
