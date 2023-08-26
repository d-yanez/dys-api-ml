const express = require("express");
const bodyParse = require("body-parser");

const app = express();
const PORT = process.env.PORT || 2977;

app.use(bodyParse.urlencoded({extends:true}));
app.use(bodyParse.json());


const apiRouters = require('./app/routes/api')
const itemsRouter = require('./app/routes/items')
app.use(apiRouters)
app.use(itemsRouter)

app.listen(PORT,() =>{
    console.log(`Tu server esta listo en el puerto->${PORT}`)
});