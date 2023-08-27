

const model = require('../models/stock')

exports.saveData = async (req, res) => {
    console.log("saving the next Stock...")
    console.log(req.body)
    //console.log(req.body.title)
    const awesome_instance = new model(
        { 
            sku: "1374696258",
            title:"Kit Cumpleaños Hot Wheels Decoración + Tela Fondo",
            location:"C009",
            stock:2,
            obs:""

        }
    );
    //await awesome_instance.save();
    console.log("saved!")

    res.send({data:'saveData!'})


}

exports.getData = async (req, res) => {
    console.log("getting..")
    const stocks = await model.find().exec();
    console.log("getted!")

    res.send(stocks)
}