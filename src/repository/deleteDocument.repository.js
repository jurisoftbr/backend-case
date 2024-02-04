const { DocumentModel } = require("../model/document.model");

const deleteDocumentByIdRepository = async (id) => {
  try {
    // Encontre o documento pelo ID e exclua-o
    const result = await DocumentModel.deleteOne({ _id: id });

    // Verifique se algum documento foi excluído
    if (result.deletedCount > 0) {
      return { message: 'Document deleted with success!', status: 200 };
    } else {
      return { message: 'No document found.', status: 404 };
    }
  } catch (error) {
    console.error('Error while deleting document:', error);
    return { message: 'Error to process the request', status: 500 };
  }
};

module.exports = { deleteDocumentByIdRepository };
