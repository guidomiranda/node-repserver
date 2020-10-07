const express = require('express')
const fileUpload = require('express-fileupload')
const path = require('path')
const usuario = require('../models/usuario')
const producto = require('../models/producto')
const fs = require('fs')
const app = express()

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

app.put('/upload/:tipo/:id', function(req, res) {
    let tipo = req.params.tipo
    let id = req.params.id

    if (!req.files) {
        return res.status(400)
            .json({
                ok: false,
                err: {
                    message: 'No se ha seleccionado ningun archivo'
                }
            })
    }

    let archivo = req.files.archivo
    let nombreCortado = archivo.name.split('.')
    let extension = nombreCortado[nombreCortado.length - 1]
    let extensionesValidas = ['jpg', 'jpeg', 'gif', 'png']

    if (extensionesValidas.indexOf(extension) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Las extensiones permitidas son ' + extensionesValidas.join(','),
                ext: extension
            }
        })
    }

    // Valida tipo
    let tiposValidos = ['productos', 'usuarios']

    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Los tipos permitidos son ' + tiposValidos.join(',')
            }
        })
    }

    // Cambiar el nombre al archivo
    let nombreArchivo = `${ id }-${ new Date().getMilliseconds() }.${ extension }`

    archivo.mv(path.resolve(__dirname, `../uploads/${tipo}/`, nombreArchivo), (err) => {
        if (err)
            return res.status(500).json({
                ok: false,
                err
            })

        if (tipo === 'usuarios') {
            imagenUsuario(id, res, nombreArchivo)
        } else {
            imagenProducto(id, res, nombreArchivo)
        }
    })

})


function imagenUsuario(id, res, nombreArchivo) {
    usuario.findById(id, (err, usuarioDB) => {
        if (err) {
            borraArchivo(nombreArchivo, 'usuarios')
            return res.status(500).json({
                ok: true,
                err
            })
        }
        if (!usuarioDB) {
            borraArchivo(nombreArchivo, 'usuarios')
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no existe'
                }
            })
        }
        console.log(usuarioDB.img);

        borraArchivo(usuarioDB.img, 'usuarios')

        usuarioDB.img = nombreArchivo

        usuarioDB.save((err, usuarioGuardado) => {
            res.json({
                ok: true,
                usuario: usuarioGuardado,
                img: nombreArchivo
            })
        })

    })
}

function imagenProducto(id, res, nombreArchivo) {
    producto.findById(id, (err, productoDB) => {
        if (err) {
            borraArchivo(nombreArchivo, 'producto')
            return res.status(500).json({
                ok: true,
                err
            })
        }
        if (!productoDB) {
            borraArchivo(nombreArchivo, 'producto')
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no existe'
                }
            })
        }

        borraArchivo(productoDB.img, 'producto')

        productoDB.img = nombreArchivo

        productoDB.save((err, productoGuardado) => {
            res.json({
                ok: true,
                usuario: productoGuardado,
                img: nombreArchivo
            })
        })

    })
}

function borraArchivo(nombreImage, tipo) {
    let pathImage = path.resolve(__dirname, `../uploads/${tipo}/${nombreImage}`)

    if (fs.existsSync(pathImage)) {
        console.log(pathImage);
        fs.unlinkSync(pathImage)
    }

}



module.exports = app