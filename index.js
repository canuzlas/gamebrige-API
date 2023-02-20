const express = require('express')
const app = express();
const dotenv = require("dotenv");
dotenv.config();
require('./src/config/db')

//routers
const apiRouter = require('./src/routers/api_router')

app.use(
   express.urlencoded({
      extended: false
   })
)
app.use(express.json())
app.use('/api', apiRouter)

app.listen(process.env.PORT || 3000, () => { console.log(process.env.PORT || 3000 + ' dinleniyor') })