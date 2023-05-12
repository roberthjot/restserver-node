const { response, request } = require('express')
const User = require('../models/users')
const bcryptjs = require('bcryptjs');

const usersGet = (req = request, res = response) => {

    const { q, nombre = 'No name', apikey, page = '1', limit } = req.query;

    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    })
}

const usersPost = async(req, res = response) => {

    

    const { nombre, correo, password, rol } = req.body
    const user = new User({ nombre, correo, password, rol });

    // Verificar si el correo existe
    const existeEmail = await User.findOne({ correo });
    if ( existeEmail ) {
        return res.status(400).json({
            msg: 'Ese correo ya esta registrado'
        })
    }

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt )

    // Guardar en BD

    await user.save()
    delete user.password;

    res.json({
        user
    })
}

const usersPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'put API - usersPut',
        id
    })
}

const usersPatch = (req, res = response) => {

    res.json({
        msg: 'patch API - usersPatch'
    })
}

const usersDelete = (req, res = response) => {

    res.json({
        msg: 'delete API - usersDelete'
    })
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}