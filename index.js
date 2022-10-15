const express = require('express')
const router = require('./routes/index')
require('dotenv').config()

const app = express()

app.use(express.json())

app.use('/api', router)

const port = 4000
app.listen(port, () => console.log('Server listening on port ' + port))
