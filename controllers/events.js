// {
//     ok: true,
//     msg : 'getEventos'
// }
const { response} = require('express');
const Evento = require('../models/Evento');

const getEventos = async (req , resp = response)=>{

    const evento = await Evento.find().populate('user','name, password');


    resp.json({
        ok : true,
        evento

    })
}
const creaEvento = async (req , resp = response)=>{
    // Verificar que tenga el evento
    const evento = new Evento( req.body );

    try {
        evento.user = req.uid;
        const eventoguardado = await evento.save();
        resp.status(200).json({
            ok: true,
            msg :"Evento creado",
            evento : eventoguardado

        })
    } catch (error) {
        console.log( error )
        resp.status( 500 ).json({
            ok : false,
            msg :"Hable con el admin"
        })
    }

}
const actualizarEvento =async (req , resp = response)=>{
    // Obtengo los parametros de url 
    const eventoId = req.params.id;
    const uid = req.uid;
    try {
        const evento = await  Evento.findById( eventoId );

        if( !evento ){
            return resp.status(404).json({
                ok :false,
                msg : "Recurso no encontrado"
            })
        }
        if( evento.user.toString() !== uid){
            return resp.status(401).json({
                ok: false,
                msg: "No tiene privilegio de editar este elemento"
            });
        }
        const nuevoEvento={
            ...req.body,
            user : uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento ,{new : true} );
        return  resp.status(200 ).json({
            ok : true,
            evento : eventoActualizado
        });
    } catch (error) {
        console.log( error );
        
        resp.status( 500 ).json({
            ok : false,
            msg: "Hable con el admin"
    })
    }


}
const eliminarEvento = async (req , resp = response)=>{

    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        const evento = await  Evento.findById( eventoId );
        // saber si el recurso  existe 
        if( !evento ){
            return resp.status(404).json({
                ok :false,
                msg : "Recurso no encontrado"
            })
        }
        // Verificar que el usuario tenga el mismo id que el recibido por el token 
        if( evento.user.toString() !== uid){
            return resp.status(401).json({
                ok: false,
                msg: "No tiene privilegio de eliminar este elemento"
            });
        }

        const eventoEliminado = await Evento.findByIdAndDelete(eventoId);
        resp.status(200 ).json({
            ok : true,
            evento : eventoEliminado
        });

    } catch (error) {
        console.log( error )
        resp.status(500).json({
            ok : false,
            msg :"Hable con el administrador"
        })
    }
}
module.exports={
    getEventos,
    creaEvento,
    actualizarEvento,
    eliminarEvento
}