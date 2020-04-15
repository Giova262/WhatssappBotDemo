/** Configuracion del servidor */
import express , { json } from 'express'
import rutasSMS from './rutas/sms'
/*import rutasProductos from './rutas/productos'
import rutasPedidos from './rutas/pedidos'
import rutasComercios from './rutas/comercios'
import rutasParametros from './rutas/parametros'*/
import cors from 'cors'
import bodyParser from 'body-parser';

/** Inicializacion */
const app = express()


/** Middlewares */
app.use( json() )
app.use(bodyParser.urlencoded({ extended:false}))
app.set( 'port' , process.env.PORT || 5000 ) 

/*cors*/
app.use(cors())

/** Rutas */
app.use('/api/whatssapp',rutasSMS)
/*app.use('/api/user',rutasUsuario)
app.use('/api/producto',rutasProductos)
app.use('/api/pedido',rutasPedidos)
app.use('/api/comercio',rutasComercios)
app.use('/api/parametro',rutasParametros)*/

app.get('/', function(req, res){
    res.json({

        "mensaje": "Server Bot Whatssapp ",
        "status": "Online",
        "puerto": app.get('port')

    });
 });


/** Exporto */
export default app