const WebSocket = require('ws');
const { WebSocketServer } = WebSocket;

 const Socket = {};
let wss;

Socket.init = (server) => {
    wss = new WebSocketServer({server});

    wss.on('connection', function connection(ws, req) {
        console.log('Connected!')

       ws.userId = req.url.split('uid=')[1];

        ws.on('error', console.error);

        ws.on('message', function message(data, isBinary) {
            wss.clients.forEach(function each(client) {
                if (ws.userId !== client.userId && client.readyState === WebSocket.OPEN) {
                    client.send(data, {binary: isBinary});
                }
            });
        });
    });
};

module.exports = Socket;
