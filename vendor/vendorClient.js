'use strict';

const io = require('socket.io-client');
const faker = require('faker');
require('dotenv').config();

/* ------ CONNECT ---------- */
let host = "http://localhost:3000/caps";

const capsConnection = io.connect(host);

/* ---- LISTENERS ------- */
capsConnection.on('delivered', deliveryLogged);

function deliveryLogged(payload) {
  console.log(`thank you for delivering ${payload.id}`)
}

/* ---- EVENT HANDLERS ------- */

setInterval(() => {
  const newOrder = {storeId: "STOREIDtest", orderId: faker.datatype.uuid(), cName: faker.name.findName(), address: faker.address.streetAddress() };
  console.log(newOrder);
  capsConnection.emit('pickup', newOrder);
},5000);
