const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    contactNumber :{
        type : String,
        require : true,
    },
    email :{
        type : String,
        maxLength : 50,
    },
    feedbacktext :{
        type : String,
    }
})

const Feedback = mongoose.model("Feedback",feedbackSchema);
module.exports = Feedback;