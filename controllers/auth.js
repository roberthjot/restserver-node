const { response } = require("express");
const bcryptjs = require('bcryptjs')

const User = require("../models/users")

const login = async(req, res = response) => {

    const { correo, password } = req.body;

    try {

        // Verificar si el email existe
        const user = await User.findOne({ correo });
        if( !user ) {
            return res.status(400).json({
                msg: 'User / Password no son correctos - correo'
            })
        }

        // Si el usuario esta activo
        if(!user.state) {
            return res.status(400).json({
                msg: 'User / Password no son correctos - estado: false'
            })
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, user.password );
        if (!validPassword) {
            return res.status(400).json({
                msg: 'User / Password no son correctos - password'
            })
        }

        // Generar JWT

        res.json({
            msg: 'Login ok'
        })
    
    } catch (error) {
            console.log(error);
            res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

    
}

module.exports = {
    login
}