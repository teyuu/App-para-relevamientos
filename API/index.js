const app = require('./src/app');
const db = require('./src/database/db');
const dotenv = require('dotenv').config()
const port = process.env.PORT || 3001;


//arrancamos el servidor
app.listen(port, () => {
    console.log(`La app listening on port ${port}`)

    //Conectar a la base de datos
    db.sync({ force: false }).then(()=>{
        console.log('Nos hemos conectado a la base de datos correctamente')
    }).catch(error =>{
        console.log('Se ha producido un error', error)
    })

})