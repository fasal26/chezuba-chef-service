import { Server } from 'socket.io';
import http from 'http';

// declaring socket in request
declare global {
    namespace Express {
      interface Request {
        sockIO?: Server;
      }
    }
  }
export class Socket {
    private server: http.Server
    constructor(server: http.Server) {
        this.server = server
    }
    public async init() {
        // Initialize a Socket.IO server
        const io = new Server(this.server,  {
            // Enable compatibility with socket.io v2 clients
            allowEIO3: true,
            // Indicates whether a connection should use compression
            perMessageDeflate: true,
            // Enable long-polling as a fallback
            transports: ["websocket"],
            cors: {
              origin: true,
              credentials: true,
            },
          });
        // Handle new WebSocket connections
        io.on('connection', (socket) => {
            console.log('A client connected:', socket.id);

            // Send a message to the client when they connect
            socket.emit('message', 'Welcome to the Socket.IO server!');

            // Listen for messages from the client
            socket.on('message', (message: string) => {
                console.log('Message from client:', message);

                // Broadcast the message to all connected clients
                io.emit('message', `Client ${socket.id} says: ${message}`);
            });

            // Handle client disconnection
            socket.on('disconnect', () => {
                console.log('Client disconnected:', socket.id);
            });
        });
        return io
    }
    // to save socket ids wrt to user
    // private async saveConnection(){
    //     // save 
    // }
}