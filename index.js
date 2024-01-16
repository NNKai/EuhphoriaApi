const express = require("express");
const app = express();
const mongoose = require("mongoose");
const AppointmentModel = require("./Models/Appointments");
require('dotenv').config()
const PORT = process.env.PORT || 80

const cors = require("cors");
const { response } = require("express");
const { db } = require("./Models/Appointments");


app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://nav:nav@cluster0.wyes8.mongodb.net/Appointment"
);

app.get("/getAppointments", (req, res) => {
  const email = req.query.email
    AppointmentModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/createappointment", async (req, res) => {
  const user = req.body;
  try {
    const result = await AppointmentModel.findOne({
      date: user.date,
      appointment: user.appointment,
    });

    if (result) {
      res.json({ error: "Appointment slot has been taken" });
    } else {
      const newUser = new AppointmentModel(user);
      await newUser.save();
      res.json(user);
    }
  } catch (error) {
    console.error("Error in creating appointment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/updateStatus", async (req, res) => {
  try {
    const id = req.query.userId;
    const status = req.body.status;

    // Update the status of the appointment with the given ID
    const updatedAppointment = await AppointmentModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.json(updatedAppointment);
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.delete ("/deleteUser", function(req, res, next){
  const id = req.query.userId
  AppointmentModel.findByIdAndDelete(id, function(err,response){
    if(err)
    res.send(err);
    else
    res.send({status:200, response})
  })
})

app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})