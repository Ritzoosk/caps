'use strict';

const io = require('socket.io-client');
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3000';
/* ------ CONNECT ---------- */

const client = io.connect(`${SERVER_URL}/caps`);

/* ---- LISTENERS ------- */
client.on('pickup', payload => {

  setTimeout(() => {
    console.log(`picking up ${payload.orderId}`);
    client.emit('in-transit', payload);
  },1500);

  setTimeout(() => {
    console.log(`delivered ${payload.orderId}`);
    client.emit('delivered', payload);
  },3000);

});

/* ---- EVENT HANDLERS ------- */

