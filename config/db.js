const mongoose = require('mongoose')

const  DB_URI = process.env.DB_URI

module.exports = () => {
    const connect =  async () => {
        try {
            mongoose.set("strictQuery", false);
            mongoose.connect(
                DB_URI
            )
            console.log('db connected!')
        } catch (error) {
            console.log(error)
            process.exit()
        }

    }
    connect();
}
// source: https://stackoverflow.com/questions/75774347/throw-new-mongooseerrormongoose-prototype-connect-no-longer-accepts-a-callba