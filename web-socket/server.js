import express from 'express';
import cors from 'cors'
import http from 'http'
import { Server as socketIO } from "socket.io";

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 5000;
        this.server = http.createServer(this.app);
        this.io = new socketIO(this.server);


        this.paths = {
            auth: '/api/auth',
        }


        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // Directorio Público
        this.app.use(express.static('public'));

    }

    routes() {

        this.app.get('/hola', function(req, res) {
            res.send('hello wrold')
        })

        this.app.use(function(req, res, next) {
            console.log(req);
            var err = new Error('Not Found xd');
            err.status = 404;
            next(err);
        });

        //this.app.use( this.paths.auth, require('../routes/auth'));        

    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });

        this.io.on('connection', (socket) => {
            console.log('a user connected');

            socket.join('notification-1')

            socket.on('disconnect', () => { console.log('user disconnected'); });
        }, )

    }

    emitLoanFunded(loanId) {
        this.io.emit('loan-funded', { loan_id: loanId, });
    }

    emitOrderProcessed({ orderId, status, userId }) {
        console.log(orderId, status, userId);

        this.io.to('notification-' + userId).emit('order-processed', {
            'order_id': orderId,
            'status': status
        })
    }

}



export { Server }