const mongoose = require("mongoose");
const express = require("express");
const cors =require("cors");


const app = express();
app.use(cors());

app.get("/countriesList",async (req,res)=>{
  let countriesList = await  Employee.find().distinct("country");
  res.json(countriesList);
});

app.get("/departmentsList",async (req,res)=>{
  let departmentsList = await  Employee.find().distinct("department");
  res.json(departmentsList);
});

app.get("/gendersList",async (req,res)=>{
  let gendersList = await  Employee.find().distinct("gender");
  res.json(gendersList);
});



app.get("/getEmployees/:country/:department/:gender",async (req,res)=>{

  console.log(req.params);

 let employeesData =  await Employee.find().and([
  { country:req.params.country },
  { department:req.params.department },
  { gender:req.params.gender },

 ]).limit(req.query.limit);

 res.json(employeesData);
});



app.listen(1586,()=>{
    console.log("Listening to port 1586");
})



let employeeSchema = new mongoose.Schema({
id:Number,
firstName:String,
lastName:String,
email:String,
gender:String,
country:String,
age:Number,
department:String,
profilepic:String

});

let Employee = new mongoose.model("employ",employeeSchema,"employ");



let connectToMDB = async ()=>{

try{


 await  mongoose.connect("mongodb+srv://satthurikranthi:anvira@cluster0.q79l2.mongodb.net/dummy?retryWrites=true&w=majority&appName=Cluster0");


 console.log("Connect to MDB successfully.");

}catch(err){


 console.log(" unable to Connect to MDB .");

}

}

connectToMDB();
