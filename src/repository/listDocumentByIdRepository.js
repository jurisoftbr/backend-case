const { DocumentModel } = require("../model/document.model");

const listDocumentByIdRepository = async (id) => {
  try {
    const list = await DocumentModel.findById(id);
 
    if (list) {
      return { message: 'Document listed with success!', status: 200, documents: list };
    }
    
    return { message: 'No document found.', status: 404 };
  } catch (error) {
    console.error('Error while listing document:', error);
    return { message: 'Error to process the request', status: 500 };
  }
};

module.exports = { listDocumentByIdRepository };
