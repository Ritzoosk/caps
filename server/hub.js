'use strict';

const port = process.env.PORT || 3000;

const io = require('socket.io')(port);

const caps = io.of('/caps');

caps.on('connection', socket => {

  console.log('New connection created : ' + socket.id);
  caps.on('pickup', payload => {
    console.log('pick up', payload);

    caps.broadcast.emit('pickup', payload)
  });

  caps.on('in-transit', payload => {
    console.log('transit', payload);

    caps.broadcast.emit('in-transit', payload)
  });

  caps.on('delivered', payload => {
    console.log('delivered', payload);
    caps.broadcast.emit('delivered', payload)
  });

});
