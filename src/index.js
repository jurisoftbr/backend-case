const express = require('express')

const { route } = require('./routes/router')

const app = express()

require('dotenv/config')
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api',route)

app.listen(process.env.PORT, ()=>{
    console.log('SERVER IS RURRING')
})


module.exports = {app}