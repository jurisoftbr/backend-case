const express = require('express')
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const { route } = require('./routes/router')

const app = express()

require('dotenv/config')
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api',route)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.listen(process.env.PORT, ()=>{
    console.log('SERVER IS RURRING')
})


module.exports = {app}