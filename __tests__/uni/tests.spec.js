const supertest = require("supertest")
const { app } = require('../../src/index')


describe('save document use case', () => {

    it('should be return a object defined with doc saved', async ()=>{
        const documentName = 'doc_protected'

        const response = await supertest(app)
            .post('/api/document')
            .send({document_name: documentName})

        expect(response.status).toBe(201)
        expect(response.body.message).toBe('Document created with success!')
        expect(response.body.document._id).toBeDefined()
    })  

});


describe('save document use case', () => {

    it('should be return all docs saved', async ()=>{
     
        const response = await supertest(app)
        .get('/api/document')

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Documents listed with success!');
        expect(Array.isArray(response.body.documents)).toBe(true);
            
    })  

});
