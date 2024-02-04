const { listAllDocumentsRepository } = require("../../repository/listAllDocuments.repository");

const listAllDocumentsUseCase = async (req, res) => {

  const listAll = await listAllDocumentsRepository()
    
  if(listAll){
    return res.status(listAll.status).json(listAll)
  }
};

module.exports = { listAllDocumentsUseCase };
