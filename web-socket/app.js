import Events from './src/events.js';
import { Server } from './src/server.js'


const server = new Server();
server.listen();

const events = new Events(server)
events.connect()