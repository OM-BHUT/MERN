const express = require('express');
const { createServer } = require('node:http');

const app = express();
const server = createServer(app);
const { Server } = require('socket.io');
const cors = require("cors");
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}));

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});

io.on('connection', (socket) => {
    console.log(`user connected ${socket.id}`);
    socket.on("join_room", (data) => {
        socket.join(data);
    });
    socket.on('sendMessage',(data)=>{
        console.log(data);
        socket.to(data.room).emit('receivedMessage',data);
    })
});

server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});