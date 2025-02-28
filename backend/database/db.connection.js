const mongoose =require('mongoose');

module.exports= dbConnection =async()=>{
  try {
    await mongoose.connect(process.env.MONGO_DB_URI).then(()=>{
      console.log("database connected")
    }).catch((err)=>{
      console.log("database not connected ", err)
    })
  } catch (error) {
    console.log("error in db.connection.js page " , error)
  }
}


