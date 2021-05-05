'use strict';

const io = require('socket.io-client');

/* ------ CONNECT ---------- */
let host = "http://localhost:3000/caps";

const capsConnection = io.connect(host);

/* ---- LISTENERS ------- */
capsConnection.on('pickup', pkgPickUp);

function pkgPickUp(payload) {
  setTimeout(() => {
    console.log(`picking up ${payload.id}`);
    capsConnection.emit('in-transit', payload);
  },1500);
  setTimeout(() => {
    console.log(`delivered ${payload.id}`);
    capsConnection.emit('delivered', payload);
  },3000);

}

/* ---- EVENT HANDLERS ------- */

