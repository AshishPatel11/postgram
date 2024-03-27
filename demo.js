import { io } from "socket.io-client";
// const io = require('socket.io-client')

const socket = io('http://localhost:5000')
console.log(socket)
socket.on('connect', () => {
    console.log('object')
})
socket.on('connect_error', () => {
    console.log('object')
})