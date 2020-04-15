   
   const MessagingResponse = require('twilio').twiml.MessagingResponse;
   import {Router} from 'express'

        /* Varibales */

   var usuarios = []

        /** Funciones */
    
   function existeElUsuario( value ) {
        for (var i in usuarios) {
            if (usuarios[i].numero == value) {

                return i
              /*  usuarios[i].desc = desc;
                break; //Stop this loop, we found it!   */
            }
        }

        return null
    }

    function proximaPregunta( indice ) {
        
        var resPregunta1 = usuarios[indice].pregunta1
        var resPregunta2 = usuarios[indice].pregunta2
        var resPregunta3 = usuarios[indice].pregunta3
        var resPregunta4 = usuarios[indice].pregunta4
        var resPregunta5 = usuarios[indice].pregunta5

        if( resPregunta1 =='No' ){ 
            if(resPregunta2 =='Si'){
                if(resPregunta3 !=''){
                    if(resPregunta4 !=''){
                        if(resPregunta5 !=''){
                            return 6 //Termino la encuesta
                        }
                        return 5 // Opciones de la pregunta 5
                    }
                    return 4 // Opciones de la pregunta 4
                }
                return 3 // Opciones de la pregunta 3
            }
            return 2 // Opciones de la pregunta 2
        }else{ 
            return 1 // Opciones de la pregunta 1
        }
    }

   const router = Router()
   
       /** Rutas */
   
   /** Defecto */
   router.get('/', function(req, res){
        res.json({
            "mensaje":"Whatssapp sms : On"
        })
    });
   
    /** Mensajes al Bot */
    router.post('/sms', function(req, res){

        console.log("Lista de usuarios registrados")
        console.log(usuarios)

        const twiml = new MessagingResponse();
        const mensaje = req.body.Body
        var indice = existeElUsuario(req.body.From)

        
        if( indice ){

            /** Analizo dependiendo del estado del usuario a que pregunta dirigirlo */
            switch ( proximaPregunta( indice )) {
                case 1: // ¿Te hiciste el test?

                        if(mensaje === "1"){ //Si

                            usuarios[indice].pregunta1 = 'Si'
                            //TODO : Antes de borrarlo de la lista mandarlo a la base de datos
                            usuarios.splice(indice, 1);
                            twiml.message("Muy bien, gracias por hacerte el Test");
            
            
                        }else if(mensaje === "2"){ //No
            
                            usuarios[indice].pregunta1 = 'No'
                            twiml.message("¿Queres hacerte el test ahora ? \n 1) Si   2) No"); 
            
                        }else{ //Opcion incorrecta
            
                            twiml.message("Opcion Invalida. Intentalo de nuevo\n\n¿ Te hiciste el test ? \n 1) Si   2) No");
                        }

                        break;

                case 2: // ¿Queres hacer el test?

                        if(mensaje === "1"){ //Si

                            usuarios[indice].pregunta2 = 'Si'
                            twiml.message("Muy bien empecemos con el test \n\n¿Tenes Tos?\n 1) Si   2) No");
            
            
                        }else if(mensaje === "2"){ //No
            
                            usuarios[indice].pregunta2 = 'No'
                            //TODO : Antes de borrarlo de la lista mandarlo a la base de datos
                            usuarios.splice(indice, 1);
                            twiml.message("Entendido! No te olvides que podes hacerlo cuando quieras!");
            
                        }else{ //Opcion incorrecta
            
                            twiml.message("Opcion Invalida. Intentalo de nuevo\n\n¿Queres hacerte el test ahora ? \n 1) Si   2) No");
                        }

                        break;

                case 3: // ¿Tenes Tos?

                        if(mensaje === "1"){ //Si

                            usuarios[indice].pregunta3 = 'Si'
                            twiml.message("Tomate la temperatura con un termómetro\n\n ¿Cuantos grados tienes?\n 1) Menos de 38 grados   2) Mas de 38 grados ");
            
            
                        }else if(mensaje === "2"){ //No
            
                            usuarios[indice].pregunta3 = 'No'
                            twiml.message("Tomate la temperatura con un termómetro\n\n ¿Cuantos grados tienes?\n 1) Menos de 38 grados   2) Mas de 38 grados");
            
                        }else{ //Opcion incorrecta
            
                            twiml.message("Opcion Invalida. Intentalo de nuevo\n\n ¿Tenes Tos?\n 1) Si   2) No");
                        }

                        break;

                case 4: // ¿Cuantos grados tienes?

                        if(mensaje === "1"){ //Menos de 38 grados

                            usuarios[indice].pregunta4 = 'Menos de 38 grados'
                            twiml.message("No tienes de que preocuparte. Puede hacer el test denuevo otro dia!");
            
            
                        }else if(mensaje === "2"){ // Mas de 38 grados
            
                            usuarios[indice].pregunta4 = 'Mas de 38 grados'
                            twiml.message("¿Tienes dolor de Garganta?\n 1) Si   2) No ");
            
                        }else{ //Opcion incorrecta
            
                            twiml.message("Opcion Invalida. Intentalo de nuevo\n\nTomate la temperatura con un termómetro\n\n¿Cuantos grados tienes?\n 1) Menos de 38 grados   2) Mas de 38 grados");
                        }

                        break;

                case 5: // ¿Tienes dolor de Garganta?

                        if(mensaje === "1"){ //Si

                            usuarios[indice].pregunta5 = 'Si'
                            //TODO : Antes de borrarlo de la lista mandarlo a la base de datos
                            
                            if(usuarios[indice].pregunta3 == 'Si'){
                                 twiml.message("Comunicate con tu medico urgentemente o llama a +54XXXXXXXXXX");
                            }else{
                                twiml.message("Quedate en casa y cuida de tu salud, no presentas todos los sintomas");
                            }

                            usuarios.splice(indice, 1);
            
            
                        }else if(mensaje === "2"){ // No
            
                            usuarios[indice].pregunta5 = 'No'
                            //TODO : Antes de borrarlo de la lista mandarlo a la base de datos
                            usuarios.splice(indice, 1);
                            twiml.message("Quedate en casa y cuida de tu salud, no presentas todos los sintomas");
            
                        }else{ //Opcion incorrecta
            
                            twiml.message("Opcion Invalida. Intentalo de nuevo\n\n¿Tienes dolor de Garganta?\n 1) Si   2) No");
                        }

                        break;
                default:
                  console.log("Ocurrio un error en el switch")
                  break;
              }  
           
        }else{

            if(mensaje === "Start"){

                usuarios.push({
                    numero: req.body.From,
                    pregunta1:'',
                    pregunta2:'',
                    pregunta3:'',
                    pregunta4:'',
                    pregunta5:''
                })
                twiml.message("Responde el siguiente cuestionario escribiendo el numero de la opcion que corresponda\n\n¿ Te hiciste el test ? \n 1) Si   2) No");
           
            }else{
                twiml.message('Escribe Start para empezar la encuesta por favor');
            }
        }

        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());

   
    });
    
   
   /** Exporto */
   export default router