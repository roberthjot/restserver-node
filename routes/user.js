

const { Router } = require('express');
const { check } = require('express-validator');

const {
        validarCampos,
        validarJWT,
        esAdminRole,
        tieneRole
} = require('../middlewares')

const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { usersGet, 
        usersPut, 
        usersPost, 
        usersDelete, 
        usersPatch, } = require('../controllers/users');
const router = Router();

router.get('/', usersGet)

router.put('/:id', [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom( existeUsuarioPorId ),
        check('rol').custom( esRoleValido ),
        validarCampos
], usersPut)

router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password deber ser mas de 6 letras').isLength({ min: 6 }),
        check('correo', 'El correo no es valido').isEmail(),
        check('correo').custom(emailExiste),
        // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('rol').custom( esRoleValido ),
        validarCampos
], usersPost)

router.delete('/:id', [
        validarJWT,
        // esAdminRole,
        tieneRole('ADMIN_ROLE', 'VENTAS_ROLE', 'OTRO_ROLE'),
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom( existeUsuarioPorId ),
        validarCampos
], usersDelete)

router.patch('/', usersPatch)

module.exports = router;