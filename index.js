const express  = require("express");
var cors = require('cors')
const { dbConnection } = require("./database/config");
 require('dotenv').config();

// Creo servidor expres

// console.log(process.env);
const app = express();


// Base de datos

dbConnection();
// CORS 
app.use(cors())
// Rutas

// Directorio publico
app.use(express.static('public'));

// Rutas 
// Lectura y parseo del body

app.use(express.json());

app.use('/api/auth',require( './routes/auth' ) );
app.use('/api/events',require( './routes/events' ) );
// TODO : CRUD : Eventos





// Escuchar peticiones
app.listen(process.env.PORT, ()=>{
    console.log(`servidor run in ${ process.env.PORT}`  );
})