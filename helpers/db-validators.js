
const Role = require('../models/role');
const User = require('../models/users');

const esRoleValido = async(rol = '') => {

    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
            throw new Error(`El rol ${ rol } no esta registrado en la BD`)
    }
}

const emailExiste = async( correo = '' ) => {
    // Verificar si el correo existe
    const existeEmail = await User.findOne({ correo });
    if ( existeEmail ) {
        throw new Error(`Este correo: ${ correo }, ya esta registrado`);
    }
}

module.exports = {
    esRoleValido,
    emailExiste
}