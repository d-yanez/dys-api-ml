const {Schema, model} = require("mongoose")

const StockSchema  = new Schema(
    {
        sku:{
            type: String
        },
        title:{
            type: String
        },
        location:{
            type: String
        },
        stock:{
            type: Number
        },
        obs:{
            type: String
        }

    }
)

module.exports = model('Stock',StockSchema)