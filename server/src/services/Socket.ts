import { Server } from 'http';
import { WebSocket, WebSocketServer } from 'ws';

export class Socket {
  private ws: WebSocketServer;

  constructor(server: Server) {
    this.ws = new WebSocketServer({ server });

    this.ws.on('connection', this.connection);
  }

  private connection(socket: WebSocket) {
    console.log('new client connected');
  }
}
