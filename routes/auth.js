/*
    Rutas de Usuarios / Auth
    host + / api/auth

*/


const { Router  } = require('express');
const { check } = require('express-validator');
const router = Router();
const { validarCampos } = require('../middlewares/validar-campos');
const { crearUsuario,  loginUsuario, validarToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');

router.post(
    '/new',
    [
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        check('password','El password debe de ser de 6 caracteres').isLength({min : 6}),
        validarCampos

    ],
    crearUsuario
);

router.post(
        '/',
        [ 
            check('email','Ingresa un email valido').isEmail(),
            check('password','El password debe de ser de 6 caracteres').isLength({min : 6}),
            validarCampos
        ],
        loginUsuario);

router.get('/renew',validarJWT,validarToken);


module.exports= router;