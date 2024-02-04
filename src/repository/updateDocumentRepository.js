const { DocumentModel } = require("../model/document.model");

const updateDocumentRepository = async (document, id, path, category) => {
    try {
        // Encontrar o documento pelo ID
        const existingDoc = await DocumentModel.findById(id);

        // Se o documento não existir, retornar uma resposta adequada
        if (!existingDoc) {
            return { message: 'Document not found.', status: 404 };
        }

        // Atualizar as propriedades do documento
        existingDoc.document_name = document;
        existingDoc.document_path = path;
        existingDoc.document_category = category;

        // Salvar as alterações no documento
        const updatedDoc = await existingDoc.save();

        if (updatedDoc) {
            return { message: 'Document updated with success!', status: 200, document: updatedDoc };
        }

        return { message: 'Error at updating the document', status: 400 };
    } catch (error) {
        console.error('Error while updating document:', error);
        return { message: 'Error to process the request', status: 500 };
    }
}

module.exports = { updateDocumentRepository };
