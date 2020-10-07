const express = require('express')
const fs = require('fs')
const path = require('path')
const { verificaToken, verificaTokenImg } = require('../middlewares/autenticacion')

let app = express()

app.get('/imagen/:tipo/:img', verificaTokenImg, (req, res) => {
    let tipo = req.params.tipo
    let img = req.params.img

    let pathImg = path.resolve(__dirname, `../uploads/${tipo}/${img}`)
    console.log(pathImg);
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg)
    } else {
        let noImage = path.resolve(__dirname, `../assets/no-image.jpg`)
        res.sendFile(noImage)
    }
})

module.exports = app