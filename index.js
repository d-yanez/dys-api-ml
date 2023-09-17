const express = require("express");
const bodyParse = require("body-parser");
const initDB = require('./config/db')

const app = express();
const PORT = process.env.PORT || 2977;

app.use(bodyParse.urlencoded({extends:true}));
app.use(bodyParse.json());


const stockRouter = require('./app/routes/stock')
const orderNotificationRouter = require('./app/routes/orderNotification')
const authMLRouter = require('./app/routes/authML')
const orderApiMLRouter = require('./app/routes/orderApiML')

app.use(stockRouter)
app.use(orderNotificationRouter)
app.use(authMLRouter)
app.use(orderApiMLRouter)

app.listen(PORT,() =>{
    console.log(`Tu server esta listo en el puerto->${PORT}`)
});

initDB();