const { DocumentModel } = require("../model/document.model");

const searchDocumentRepository = async (search) => {
  try {
 
    let startDate, endDate;

    if (isValidDate(search)) {
      startDate = new Date(`${search}T00:00:00.000Z`);
      endDate = new Date(`${search}T23:59:59.999Z`);
    }
  
    const list = await DocumentModel.find({
      $or: [
        { document_name: { $regex: search, $options: 'i' } }, // 'i' para case-insensitive
        { document_category: { $regex: search, $options: 'i' } },
     
        isValidDate(search) ? { create_at: { $gte: startDate, $lte: endDate } } : null
      ].filter(Boolean) 
    });

    if (list.length > 0) {
      return { message: 'Documents listed with success!', status: 200, documents: list };
    }

    return { message: 'No documents found.', status: 404 };
  } catch (error) {
    console.error('Error while listing documents:', error);
    return { message: 'Error processing the request', status: 500 };
  }
};

// Função auxiliar para verificar se uma string é uma data válida
function isValidDate(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return dateString.match(regex) !== null;
}

module.exports = { searchDocumentRepository };
