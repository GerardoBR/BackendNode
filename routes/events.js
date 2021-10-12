// Crear CRUD delete 
/*
    Rutas de Eventos / Events
    host + / api/events

*/

const { Router  } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, creaEvento,actualizarEvento,eliminarEvento } = require('../controllers/events');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

const router = Router();
router.use( validarJWT );

router.get('/',getEventos);

router.post(
        '/',
        [   // el primer valor del check es el nombre de la prpiedad enviada
            check ('title','El titulo es obligatorio').not().isEmpty(),
            check ('start','La fecha inicio debe ser obligatoria').custom( /*ni funcion */ isDate ),
            check ('end','La fecha final  debe ser obligatoria').custom( /*ni funcion */ isDate ),
            validarCampos

        ]
        ,
        creaEvento);
router.put('/:id', 
            [
                check ('title','El titulo es obligatorio').not().isEmpty(),
                check ('start','La fecha inicio debe ser obligatoria').custom( /*ni funcion */ isDate ),
                check ('end','La fecha final  debe ser obligatoria').custom( /*ni funcion */ isDate ),
                validarCampos
            ],
            actualizarEvento);
router.delete('/:id',eliminarEvento);

module.exports= router;