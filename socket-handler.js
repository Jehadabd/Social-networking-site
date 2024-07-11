io=require('socket.io')();
const jwt=require('./middlewares/authentication')
io.use(jwt)
io.on('connection',socket=>{
    console.log('New client connected'+socket.id)
})
