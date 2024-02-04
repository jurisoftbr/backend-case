const { deleteDocumentByIdUseCase } = require('../useCase/deleteDocument/deleteDocument.usecase')
const { listAllDocumentsUseCase } = require('../useCase/listAllDocuments/listAllDocuments.usecase')
const { listDocumentByIdUseCase } = require('../useCase/listDocumentById/listDocumentById.usecase')
const { saveDocumentUseCase } = require('../useCase/saveDocument/saveDocument.usecase')
const { searchDocumentUseCase } = require('../useCase/searchDocument/searchDocument.usecase')
const { updateDocumentUseCase } = require('../useCase/updateDocument/updateDocument.usecase')

const route = require('express').Router()


/**
 * @swagger
 * components:
 *   schemas:
 *     Document:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID do documento.
 *         document_name:
 *           type: string
 *           description: Nome do documento.
 *         document_path:
 *           type: string
 *           description: Caminho do documento.
 *         document_category:
 *           type: string
 *           description: Categoria do documento.
 *         create_at:
 *           type: string
 *           format: date-time
 *           description: Data de criação do documento.
 *         update_at:
 *           type: string
 *           format: date-time
 *           description: Data da última atualização do documento.
 *         __v:
 *           type: integer
 *           description: Versão do documento.
 *       required:
 *         - document_name
 *         - document_path
 *         - document_category
 *         - create_at
 *         - update_at
 */

/**
 * @swagger
 * tags:
 *   name: Documents
 *   description: Endpoints relacionados a documentos.
 */

/**
 * @swagger
 * /api/document:
 *   post:
 *     summary: Cria um novo documento com upload de arquivo.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: document_name
 *         type: string
 *         description: Nome do documento.
 *       - in: formData
 *         name: file
 *         type: file
 *         description: Arquivo do documento.
 *     responses:
 *       201:
 *         description: Documento criado com sucesso.
 *         content:
 *           application/json:
 *             example:
 *               message: Document created with success!
 *               status: 201
 *               document:
 *                 document_name: test doc fakes
 *                 document_path: file-1707064035945-544456236.pdf
 *                 document_category: NLU define
 *                 _id: 65bfbae30e5d452c6948355c
 *                 create_at: '2024-02-04T16:27:15.953Z'
 *                 update_at: '2024-02-04T16:27:15.953Z'
 *                 __v: 0
 *       400:
 *         description: Dados inválidos.
 *         content:
 *           application/json:
 *             example:
 *               message: Error at save the document
 *               status: 400
 *       500:
 *         description: Erro interno.
 *         content:
 *           application/json:
 *             example:
 *               message: Error to process the request
 *               status: 500
 */

/**
 * @swagger
 * /api/document:
 *   get:
 *     tags: [Documents]
 *     summary: Lista todos os documentos.
 *     responses:
 *       200:
 *         description: Sucesso.
 *         content:
 *           application/json:
 *             example:
 *               message: Documents listed with success!
 *               status: 200
 *               documents:
 *                 - _id: 65bfaf53bf9e92e8821cd36d
 *                   document_name: test ger
 *                   document_path: file-1707061075701-557501381.png
 *                   document_category: NLU define
 *                   create_at: '2024-02-04T15:37:55.710Z'
 *                   update_at: '2024-02-04T15:37:55.710Z'
 *                   __v: 0
 *       404:
 *         description: Nenhum documento encontrado.
 *         content:
 *           application/json:
 *             example:
 *               message: No documents found.
 *               status: 404
 *       500:
 *         description: Erro ao processar a solicitação.
 *         content:
 *           application/json:
 *             example:
 *               message: Error to process the request
 *               status: 500
 */

/**
 * @swagger
 * /api/document/{id}:
 *   get:
 *     tags: [Documents]
 *     summary: Obtém um documento por ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do documento.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucesso.
 *         content:
 *           application/json:
 *             example:
 *               message: Document listed with success!
 *               status: 200
 *               documents:
 *                 _id: 65bfb545373a6c245bb08ea1
 *                 document_name: test doc fake
 *                 document_path: file-1707062983042-211273541.pdf
 *                 document_category: NLU define
 *                 create_at: '2024-02-04T16:03:17.530Z'
 *                 update_at: '2024-02-04T16:03:17.530Z'
 *                 __v: 0
 *       404:
 *         description: Nenhum documento encontrado.
 *         content:
 *           application/json:
 *             example:
 *               message: No document found.
 *               status: 404
 *       500:
 *         description: Erro ao processar a solicitação.
 *         content:
 *           application/json:
 *             example:
 *               message: Error to process the request
 *               status: 500
 */

/**
 * @swagger
 * /api/document/search:
 *   post:
 *     tags: [Documents]
 *     summary: Pesquisa documentos com base nos parâmetros fornecidos [nome, categoria e data].
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               search:
 *                 type: string
 *                 description: Termo de pesquisa.
 *     responses:
 *       200:
 *         description: Sucesso.
 *         content:
 *           application/json:
 *             example:
 *               message: Documents listed with success!
 *               status: 200
 *               documents:
 *                 - _id: "65bfb545373a6c245bb08ea1"
 *                   document_name: "test doc fake"
 *                   document_path: "file-1707062983042-211273541.pdf"
 *                   document_category: "NLU define"
 *                   create_at: "2024-02-04T16:03:17.530Z"
 *                   update_at: "2024-02-04T16:03:17.530Z"
 *                   __v: 0
 *               # Adicione mais itens se houver mais documentos
 *       404:
 *         description: Nenhum documento encontrado.
 *         content:
 *           application/json:
 *             example:
 *               message: No documents found.
 *               status: 404
 *       500:
 *         description: Erro ao processar a solicitação.
 *         content:
 *           application/json:
 *             example:
 *               message: Error processing the request.
 *               status: 500
 */

/**
 * @swagger
 * /api/document/{id}:
 *   put:
 *     tags: [Documents]
 *     summary: Atualiza um documento por ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do documento.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               document_name:
 *                 type: string
 *                 description: Nome do documento.
 *               file:
 *                 type: file
 *                 description: Arquivo do documento.
 *     responses:
 *       200:
 *         description: Documento atualizado com sucesso.
 *         content:
 *           application/json:
 *             example:
 *               message: Document updated with success!
 *               status: 200
 *               document:
 *                 _id: 65bfbae30e5d452c6948355c
 *                 document_name: test doc fakes
 *                 document_path: file-1707064855873-242981895.pdf
 *                 document_category: NLU define
 *                 create_at: '2024-02-04T16:27:15.953Z'
 *                 update_at: '2024-02-04T16:27:15.953Z'
 *                 __v: 0
 *       400:
 *         description: Erro ao atualizar o documento.
 *         content:
 *           application/json:
 *             example:
 *               message: Error at updating the document
 *               status: 400
 *       500:
 *         description: Erro ao processar a solicitação.
 *         content:
 *           application/json:
 *             example:
 *               message: Error to process the request
 *               status: 500
 */

/**
 * @swagger
 * /api/document/{id}:
 *   delete:
 *     tags: [Documents]
 *     summary: Exclui um documento por ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do documento.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Documento excluído com sucesso.
 *         content:
 *           application/json:
 *             example:
 *               message: Document deleted with success!
 *               status: 200
 *       404:
 *         description: Nenhum documento encontrado.
 *         content:
 *           application/json:
 *             example:
 *               message: No document found.
 *               status: 404
 *       500:
 *         description: Erro ao processar a solicitação.
 *         content:
 *           application/json:
 *             example:
 *               message: Error to process the request
 *               status: 500
 */

route.post('/document',saveDocumentUseCase)

route.get('/document',listAllDocumentsUseCase)

route.get('/document/:id',listDocumentByIdUseCase)

route.post('/document/search',searchDocumentUseCase)

route.put('/document/:id',updateDocumentUseCase)

route.delete('/document/:id',deleteDocumentByIdUseCase)

module.exports = {route}