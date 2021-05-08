'use strict';

const PORT = process.env.PORT || 3000;
const io = require('socket.io')(PORT);

//connect to server
io.on('connection', socket => {
  console.log('New connection created : ' + socket.id);
});

const caps = io.of('/caps');

//connect to namespace
caps.on('connection', socket => {

  console.log('New connection in caps.on : ' + socket.id);

  socket.on('join', room => {
    console.log('room name:', room);
    socket.join(room);
  });

    //PICKUP//

  socket.on('pickup', payload => {
    //log it with time
    logger('pickup', payload);
    //show in console
    // console.log('pickup', payload);
    //broadcast
    caps.emit('pickup', payload)
  });

    //IN-TRANSIT//

  socket.on('in-transit', payload => {
    logger('in-transit', payload);
    // console.log('transit', payload);

    caps.to(payload.store).emit('in-tansit', payload);

  });

  socket.on('delivered', payload => {
    logger('delivered', payload);
    // console.log('delivered', payload);

    caps.to(payload.store).emit('delivered', payload);

  });

});

function logger (event, payload) {
  let  timestamp = new Date();
  console.log({ timestamp, event, payload});
}