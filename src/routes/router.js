const { saveDocumentUseCase } = require('../useCase/saveDocument.usecase')

const route = require('express').Router()

route.post('/document',saveDocumentUseCase)

module.exports = {route}