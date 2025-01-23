const express = require("express");
const app = express();

const port = 8080;
const path = require("path");
app.use(express.urlencoded({extended:true})); // thi line is use to pasre the data from the req body
app.use(express.json());
const Feedback = require("./models/feedback.js");   //We have export our feedback module from models to index.js
const methodOverride = require("method-override");

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"));
app.use(express.static(path.join(__dirname , "public")));
app.use(methodOverride("_method"));

const mongoose = require("mongoose");
main()
    .then(()=>{
        console.log("connection successful");
    })
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/feedback');
}  

app.get("/" , (req,res) =>{
  res.sendFile(__dirname+'/views/index.html'); // this is use to show index.html file at starting at /
})

app.post("/submit-feedback", async (req, res) => {

  let {name,contactNumber,email,feedbacktext:data} = req.body;
  console.log(req.body);

  const feedback = new Feedback({
    name,
    contactNumber,
    email,
    feedbacktext:data,
  });

  try {
    await feedback.save({runValidators:true , new:true});
    console.log("Feedback saved successfully");
    res.render("mains.ejs");
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).send("An error occurred while saving feedback.");
  }
});

app.listen(port,()=>{
  console.log("sever is working properly");
})

