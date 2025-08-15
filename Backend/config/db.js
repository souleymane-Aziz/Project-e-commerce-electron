const mongoose = require('mongoose');

mongoose
  .mongoose.connect("mongodb+srv://" + process.env.DB_USER_PASS + "@db-projet-e-commerce.sbu6r5c.mongodb.net/projet-e-commerce"
  )
  .then(()=>console.log('Connected on mongodb'))
  .catch((err)=>console.log('Failed to connect to mongodb ',  err))