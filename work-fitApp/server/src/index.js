import express from 'express'; //create server
import cors from 'cors'; //allow frontend req
import mongoose from 'mongoose'; //connection with database
import dotenv from 'dotenv' //contains all secret keys

dotenv.config();//load all keys

const app=express(); //create server

app.use(cors())
app.use(express.json()); //allow json data

const PORT=process.env.PORT || 5000; //set port

app.get('/', function(req, res){
   res.send("Welcome to tutorialspoint!");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected ✅')
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    })
  })
  .catch(err => console.error(err));

app.listen(5000, function(){
   console.log("Server is running on port 3000");
});