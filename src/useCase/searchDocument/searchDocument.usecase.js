const { searchDocumentRepository } = require("../../repository/searchDocument.repository");

const searchDocumentUseCase = async (req, res) => {

    const {search} = req.body
 
    const list = await searchDocumentRepository(search)
        
    if(list){
        
        return res.status(list.status).json(list)
    }
};

module.exports = { searchDocumentUseCase };
