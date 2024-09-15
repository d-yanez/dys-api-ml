const mongoose = require('mongoose')

const  DB_URI = process.env.DB_URI

/*module.exports = () => {
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
    */

// Definir la función de conexión
async function connectDB() {
    try {
      await mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000, // 20 segundos en lugar de 10
      });
      console.log('Conexión a la base de datos exitosa');
    } catch (error) {
      console.error('Error al conectar a la base de datos:', error);
      throw error; // Puedes relanzar el error si quieres que la aplicación se detenga
    }



  }

  mongoose.connection.on('connected', () => {
    console.log('Conectado a MongoDB');
  });
  
  mongoose.connection.on('error', (err) => {
    console.error('Error en la conexión a MongoDB:', err);
  });
  
  mongoose.connection.on('disconnected', () => {
    console.log('Desconectado de MongoDB');
  });
  mongoose.set('bufferCommands', false);
  module.exports = connectDB;





// source: https://stackoverflow.com/questions/75774347/throw-new-mongooseerrormongoose-prototype-connect-no-longer-accepts-a-callba