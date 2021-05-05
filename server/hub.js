'use strict';

const PORT = process.env.PORT || 3000;
const io = require('socket.io')(PORT);

io.on('connection', socket => {
  onsole.log('New connection created : ' + socket.id);
});

const caps = io.of('/caps');


caps.on('connection', socket => {

  socket.on('pickup', payload => {
    //log it with time
    logger('pick up', payload);
    //show in console
    console.log('pick up', payload);
    //broadcast
    caps.broadcast.emit('pickup', payload)
  });

  socket.on('in-transit', payload => {
    logger('pick up', payload);
    console.log('transit', payload);

    caps.broadcast.emit('in-transit', payload)
  });

  socket.on('delivered', payload => {
    logger('pick up', payload);
    console.log('delivered', payload);
    caps.broadcast.emit('delivered', payload)
  });

});

function logger (event, payload) {
  let  timestamp = new Date();
  console.log({ timestamp, event, payload});
}