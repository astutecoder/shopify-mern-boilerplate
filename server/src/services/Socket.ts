import { Server } from 'http';
import { WebSocket, WebSocketServer } from 'ws';

class Socket {
  static instance: Socket | null = null;
  private _server: WebSocketServer | null = null;
  private _socket: WebSocket | null = null;

  private connection(socket: WebSocket) {
    this._socket = socket;
  }

  public static getInstance() {
    if (!Socket.instance) {
      Socket.instance = new Socket();
    }
    return Socket.instance;
  }

  connect(server: Server) {
    const socketServer = new WebSocketServer({ server });
    this._server = socketServer;
    socketServer.on('connection', this.connection.bind(this));
  }

  send(type: string, data: any) {
    if (this._server) {
      this._server.clients.forEach((client) => {
        client.send(JSON.stringify({ type, data }));
      });
    } else {
      console.log('no socket connection available');
    }
  }
}

export const socket = Socket.getInstance();
