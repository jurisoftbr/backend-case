const { deleteDocumentByIdRepository } = require("../../repository/deleteDocument.repository");

const deleteDocumentByIdUseCase = async (req, res) => {

    const {id} = req.params
 
    const del = await deleteDocumentByIdRepository(id)
        
    if(del){
        return res.status(del.status).json(del)
    }
};

module.exports = { deleteDocumentByIdUseCase };
