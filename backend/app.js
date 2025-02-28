require('dotenv').config();
const express =require('express');
const app =express();
const dbConnection =require('./database/db.connection.js')

const authRoutes =require('./routes/authRoutes.js')
const cookieParser =require('cookie-parser');
const cors =require('cors');


app.use(express.json());
  app.use(express.urlencoded({extended:true}));
  app.use(cors());
  app.use(cookieParser());

app.use("/user",authRoutes);



app.listen(process.env.PORT,()=>{
    dbConnection();
  console.log("server started");
})