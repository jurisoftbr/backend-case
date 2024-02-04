const { listDocumentByIdRepository } = require("../../repository/listDocumentByIdRepository");

const listDocumentByIdUseCase = async (req, res) => {

    const {id} = req.params
 
    const list = await listDocumentByIdRepository(id)
        
    if(list){
        return res.status(list.status).json(list)
    }
};

module.exports = { listDocumentByIdUseCase };
