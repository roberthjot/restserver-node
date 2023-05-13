const { response, request } = require('express')
const User = require('../models/users')
const bcryptjs = require('bcryptjs');

const usersGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { state: true }
    
    const [ total, users ] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip( Number( desde ) )
            .limit(Number(limite))
    ]);

    res.json({
        total,
        users
    })
}

const usersPost = async(req, res = response) => {

    

    const { nombre, correo, password, rol } = req.body
    const user = new User({ nombre, correo, password, rol });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt )

    // Guardar en BD

    await user.save()

    res.json({
        user
    })
}

const usersPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    // TODO: Validar contra base de datos
    if ( password ) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt )
    }

    const users = await User.findByIdAndUpdate( id, resto );

    res.json(users);
}

const usersPatch = (req, res = response) => {

    res.json({
        msg: 'patch API - usersPatch'
    })
}

const usersDelete = async(req, res = response) => {

    const { id } = req.params;

    // Fisicamente lo borramos
    // const user = await User.findByIdAndDelete( id );

    const user = await User.findByIdAndUpdate( id, { state: false } )

    res.json(user)
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}