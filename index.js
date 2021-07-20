const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const authRouter = require('./Routers/authRouter')
const countriesRouter = require('./Routers/countriesRouter')

const PORT = process.env.PORT || 80

const app = express()

app.use(express.json())
app.use(cors())
app.use('/auth', authRouter)
app.use('/countries', countriesRouter)

const start = async () => {
  try {
    await mongoose.connect(`mongodb+srv://admin:admin@cluster0.6kjqn.mongodb.net/Country+Matcher?retryWrites=true&w=majority`)
    app.listen(PORT, () => console.log(`server is started on ${PORT}`))
  } catch (e) {
    console.error(e)
  }
}

start()