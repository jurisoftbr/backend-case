const mongoose = require('mongoose');
const {connectToMongoDB} = require('../database/connection')

connectToMongoDB()

const Schema = mongoose.Schema;

const documentSchema = new Schema({
  document_name: String,
});

const DocumentModel = mongoose.model('document', documentSchema);



module.exports = {DocumentModel}