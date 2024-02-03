const mongoose = require('mongoose');
require('dotenv/config')
const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });

        console.log('Conexão bem-sucedida com o MongoDB!');
  } catch (error) {
    console.error('Erro de conexão com o MongoDB:', error.message);
  }
};

module.exports = {connectToMongoDB};
