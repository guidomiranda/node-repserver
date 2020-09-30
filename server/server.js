const port = require('./config/config').port
const path = require('path')
const express = require('express')
console.log(__dirname);
const app = express()
app.use(express.static(path.resolve(__dirname, './public')))

const colors = require('colors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const { dirname } = require('path');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(require('./routes/index'))

mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }, (err, res) => {
    if (err) throw err

    console.log('Base de datos ONLINE')
})

app.listen(process.env.PORT, () => { console.log('Escuchando el puerto:', process.env.PORT) })