const {Schema, model} = require("mongoose")

const ParamSchema  = new Schema(
    {
        name:{
            type: String
        },
        type:{
            type: String
        },
        value:{
            type: String
        }

    }
)

module.exports = model('Param',ParamSchema)