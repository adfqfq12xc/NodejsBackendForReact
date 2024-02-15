const express = require('express');
const app = express();
const mongoose = require('mongoose');
const helmet = require('helmet');
const dotenv = require('dotenv');
const morgan = require('morgan');
const userRoot=require("./routes/users")
const authroot=require("./routes/auth")
dotenv.config();
const postroute=require("./routes/post")
mongoose.connect("mongodb://0.0.0.0/")
const multer=require("multer")
const con=mongoose.connection;
con.once('open',()=>{
  console.log("sucessfuly")
})
// Use helmet middleware for security headers
app.use(helmet());
app.use(express.json())
app.use(morgan("common"))
const upload=multer();
const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"public/")
  },
  filename:(req,file,cb)=>{
    cb(null,req.body.name)
  }
})
app.post("/api/upload",upload.single("file"),(req,res)=>{
  try{
    res.status(200).json("File uploaded")

  }catch(err){
    console.log(err)
  }
})



app.get('/',(req,res)=>{
    res.send("welcome to homepage")
})
app.get('/users',(req,res)=>{
    res.send("welcome to userspage")
})
app.use("/api/users",userRoot)
app.use("/api/auth",authroot)
app.use("/api/posts",postroute)


app.listen(8080, () => {
  console.log('Backend server is running on port 8800');
});