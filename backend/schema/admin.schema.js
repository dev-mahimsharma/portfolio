const mongoose =require('mongoose');

const adminSchema =new mongoose.Schema({

    userName:String,
    email:String,
    password:String,
    profileAvatar:String,
    
    role:{
      type:String,
      default:"admin"
    },
    




},{timestamps:true});

const adminModel =mongoose.model("admin",adminSchema);

module.exports =adminModel;