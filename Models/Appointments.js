const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
 
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  telephone: {
    type: String,
    required: false,
  },
  date: {
    type: String,
    required: false,
  },
  appointment: {
    type: String,
    required: false,
  },
  services: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: false,
  },
 
},);

UserSchema.statics.isThisDateInUse = async function(date) {
  if(!date) throw new Error ('invalid date')
  try {
    const foundDate = await this.findOne({date})
    if(foundDate) return false

    return true
  }catch (error){
    console.log("error inside")
    return false
  }

}
UserSchema.statics.isThisAppointmentInUse

const AppointmentModel = mongoose.model("appointments", UserSchema);
module.exports = AppointmentModel;
