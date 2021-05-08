'use strict';

const express = require('express');
const cors = require('cors');
const faker = require('faker')
const io = require('socker.io-client');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const socket = io.connect(`${SERVER_URL}/caps`);

const app = express();
const PORT = process.env.PORT || 3001;

app.post('/pickup', (req, res) => {
  let pkg = req.body || {
    storeId: "TestStoreIdTest", 
    orderId: faker.datatype.uuid(), 
    cName: faker.name.findName(), 
    address: faker.address.streetAddress() };

  socket.emit('pickup', pkg );
  res.status(200).send('your pkg was put in a truck')

});

app.listen(PORT, () => {
  console.log(`API Server up on: ${PORT}`)
});