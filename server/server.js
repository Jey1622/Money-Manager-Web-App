const app=require('./app');
const mongoose = require("mongoose");

  mongoose
    .connect(process.env.DB_LOCAL_URI)
    .then((con) => {
      app.listen(process.env.PORT,"",()=>{
        console.log(`MongoDB is Connected to the host: ${con.connection.host}`);
        console.log(`My Server listening to the port: ${process.env.PORT}`);
      })
    })
    