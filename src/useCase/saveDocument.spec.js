const supertest = require("supertest")
const { app } = require('../index')


describe('save document use case', () => {

    it('should be defined document name', async () => {
        
        const documentName = 'doc_protected'

        const response = await supertest(app)
            .post('/api/document')
            .send({document_name: documentName})

        // Verificações
        expect(response.status).toBe(200);
        expect(response.body.message).toBe(documentName);
    });

    

});
