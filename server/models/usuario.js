const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Usuario = require('../routes/usuario');


const Schema = mongoose.Schema

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es rol valido'
}
let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contrasenha es obligatoria']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

usuarioSchema.methods.toJSON = function() {
    let user = this
    let userObject = user.toObject()
    delete userObject.password

    return userObject
}
usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser unico'
})
module.exports = mongoose.model('usuario', usuarioSchema)