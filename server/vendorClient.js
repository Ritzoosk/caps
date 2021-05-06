'use strict';

const io = require('socket.io-client');
const faker = require('faker');

const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3000';

const socket = io.connect(`${SERVER_URL}/caps`);

const store = "1-206-flowers";

socket.emit('join', store);


/* ---- LISTENERS ------- */
socket.on('delivered', payload => {
  console.log(`thank you for delivering ${payload.orderId}`)
});

/* ---- EVENT HANDLERS ------- */

setInterval(() => {
  const newOrder = {
    storeId: "STOREIDtest", 
    orderId: faker.datatype.uuid(), 
    cName: faker.name.findName(), 
    address: faker.address.streetAddress() };

  console.log(newOrder);
  socket.emit('pickup', newOrder);
},5000);
