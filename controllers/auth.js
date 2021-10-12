const {response, json} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/UserModel');
const { generarJWT } = require('../helpers/jwt');


const crearUsuario = async (req , resp = response)=>{
   
    const { email, password} = req.body;

    try {
        
        let usuario =await  Usuario.findOne({ email : email})

        if ( usuario ){
            return resp.status(400).json({
                ok: false,
                msg : "El correo ya existe"
            })
        }
        usuario = new Usuario(req.body);
        // Encriptar contraseña

        // generar un salt 

        const salt = bcrypt.genSaltSync();// 10 es por defectp
        usuario.password = bcrypt.hashSync(password, salt );

        await usuario.save();

        // Gerarar Json web Token JWT

        const token = await generarJWT( usuario.id, usuario.name );

        resp.status(201).json({
            ok : true,
            uid: usuario.id,
            name : usuario.name,
            token 
        })
    } catch (error) {
        resp.status(500).json({
            ok: false,
            msg :" Por favor comunicate con el admin"
        })
    }

}

const loginUsuario = async (req , resp = response)=>{
    const { email, password} = req.body;

    try {

        const usuario =await  Usuario.findOne({ email : email})

        if ( !usuario ){
            return resp.status(400).json({
                ok: false,
                msg : "El usuario no existe "
            })
        }
        // confirmar password
        const validPassword = bcrypt.compareSync( password, usuario.password )
        if( !validPassword ){
            return resp.status(400).json({
                ok : false,
                msg : "Password incorrecto"
            })
        }

        // Respuesta
        const token = await generarJWT( usuario.id, usuario.name );

        resp.status(201).json({
            ok : true,
            uid: usuario.id,
            name : usuario.name,
            token
        })
        


    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg :" Por favor comunicate con el admin"
        });
    }
    // resp.status(201).json({
    //     ok : true,
    //     msg : 'login',
    //     email,
    //     password
    // })

}
const validarToken = async (req , resp = response)=>{

    const { uid, name } = req;
    // Generar un nuevo jwt y retornarnos en esta peticion

    const token = await generarJWT( uid, name );
    resp.json({
        ok : true,
        msg : 'renew',
        token
    })
}
module.exports = {
    crearUsuario,
    loginUsuario,
    validarToken

}