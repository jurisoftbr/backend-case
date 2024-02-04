const { DocumentModel } = require("../model/document.model");

const listAllDocumentsRepository = async () => {
  try {
    const listAll = await DocumentModel.find();

    if (listAll.length > 0) {
      return { message: 'Documents listed with success!', status: 200, documents: listAll };
    }
    
    return { message: 'No documents found.', status: 404 };
  } catch (error) {
    console.error('Error while listing documents:', error);
    return { message: 'Error to process the request', status: 500 };
  }
};

module.exports = { listAllDocumentsRepository };
