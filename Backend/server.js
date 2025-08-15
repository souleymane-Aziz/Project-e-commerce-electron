const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.route');
const orderRoutes = require('./routes/order.route');
const categoryRoutes = require('./routes/category.route');
require('dotenv').config({path: './config/.env'});
require('./config/db');
const app = express();
const cors = require('cors');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use(cors({
  origin: 'http://localhost:3000' // frontend React
}));
//routes
app.use('/api/users',userRoutes );
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/categories', categoryRoutes);
//server
app.listen(process.env.PORT, ()=>{
    console.log(`Listening on port ${process.env.PORT}`)
})