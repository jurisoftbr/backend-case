const mongoose = require('mongoose');
const {connectToMongoDB} = require('../database/connection')

connectToMongoDB()

const Schema = mongoose.Schema;
//Esse schema é simples e segue a ideia do que foi proposto. 
// Temos aqui um nome do arquivo, o path é quando fizer upload do mesmo e a categoria é dinamica usando PLN para classificar o conteúdo do mesmo 
const documentSchema = new Schema({
  document_name: String,
  document_path: String,
  document_category: String,
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now }
});

const DocumentModel = mongoose.model('document', documentSchema);



module.exports = {DocumentModel}