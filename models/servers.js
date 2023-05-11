const express = require('express')
const cors = require('cors')

class Server {

    constructor() {
        this.app    = express();
        this.port = process.env.PORT
        this.userPatch = '/api/users'

        // Middlewares
        this.middlewares()

        // Rutas de mi app
        this.routes();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Parseo y la lectura del body
        this.app.use( express.json() )

        // Directorio publico
        this.app.use( express.static('public') );

    }

    routes() {
       
        this.app.use( this.userPatch, require('../routes/user'))

    }

    listen() {
        this.app.listen( this.port, () => {
        console.log('servidor corriendo en puerto', this.port)
        })
    }

}

module.exports = Server;        