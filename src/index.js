/** Inicio de la Aplicacion  */
import app from './server'
import '@babel/polyfill'

async function main(){
    await app.listen( app.get('port') )
    console.log('Escuchando en el puerto '+ app.get('port'))
}

main()
