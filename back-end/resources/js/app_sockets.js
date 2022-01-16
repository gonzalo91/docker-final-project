import PubSub from 'pubsub-js'
import iziToast from 'izitoast';
import { io } from "socket.io-client";
import config from './config';

class AppSockets {



    listen() {
        const urlWebSocket = config.app_url

        const socket = io(urlWebSocket, { path: '/web-socket/socket.io' });

        socket.on("connect", () => {

        });

        socket.on(config.event_loan_funded, function(data) {
            iziToast.success({
                title: `Prestamo <b>#${data['loan_id']}</b> fondeado completamente`,
                position: 'topRight',
            });

            PubSub.publish(config.pubsub_loan_funded, { 'loan_id': data['loan_id'] });
        })

        socket.on(config.event_order_processed, function(data) {

            const status = data['status'];
            const orderId = data['order_id'];

            PubSub.publish(config.pubsub_order_processed, data);

            if (status == 'ok')
                iziToast.success({
                    title: 'Orden aprobada: #' + orderId,
                    position: 'topRight',
                });
            else
                iziToast.error({
                    title: 'Orden rechazada: #' + orderId,
                    position: 'topRight',
                });
        })
    }


}

export default AppSockets