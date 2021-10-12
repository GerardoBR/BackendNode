const {Schema, model} = require('mongoose');


const EventoSchema = Schema({

    title : {
        type: String,
        required : true
    },
    notes :{
        type : String
    },
    start :{
        type : Date,
        required : true
    },
    end : {
        type: Date,
        required : true
    },
    user :{
        // Referencia a usuario 
        type : Schema.Types.ObjectId,
        ref : 'Usuarios', // nombre del otro esquema,
        required : true
    }
});

// Cambiar el nombre de la propiedad

EventoSchema.method('toJSON',function(){
    const { __v, _id, ...object } = this.toObject();
    object.id= _id;
    return object;
})


module.exports = model('Evento', EventoSchema);