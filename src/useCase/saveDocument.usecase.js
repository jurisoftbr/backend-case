const { saveDocumentRepository } = require("../repository/saveDocument.repository");


const saveDocumentUseCase = async (req, res) => {

  const { document_name } = req.body;

  const saveDocs = await saveDocumentRepository(document_name)
    
  if(saveDocs){
    return res.status(saveDocs.status).json(saveDocs)
  }
};

module.exports = { saveDocumentUseCase };
