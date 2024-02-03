const { DocumentModel } = require("../model/document.model");

const saveDocumentRepository = async (document) => {
    try {
        const newDoc = new DocumentModel({ document_name: document.document_name });
        
        const savedDoc = await newDoc.save();

        if(savedDoc){
            return {message: 'Document created with success!', status: 201, document: savedDoc}
        }
        return {message:'Error at save the document', status: 400}
    } catch (error) {
        return {message: 'Error to process the request', status: 500}
    }
}

module.exports = {saveDocumentRepository}