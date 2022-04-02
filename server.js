const express = require('express'),
  app = express(),
  http = require('http').createServer(app),
  io = require('socket.io')(http),
  
  gameTime = require('./game-time.js'),
  gameTimes = gameTime.init(),//инициализируем отсчет времени
  host = 'localhost',
  port = 7000;
  
  

let clients = [],
  timer = false,
  timerUpdate = 1000

const startSandtime = (socket) => {
  timer = setTimeout( function tick(){
    socket.emit('dateTime', gameTimes.getTime());
    timer = setTimeout(tick, timerUpdate);
  },timerUpdate)
}

io.on('connection', (socket) => {
  gameTimes.socket = socket
  console.log(`Client with id ${socket.id} connected`)
  clients.push(socket.id)

  

  socket.on('speedTime', (speed) => {
    gameTimes.setSpeedOfTime(parseInt(speed));
    if(parseInt(speed) === 0) return false;
  
    if(parseInt(speed) > 0)
      timerUpdate = 1000 * parseInt(speed)
    else 
      timerUpdate = 1000 / Math.abs(speed)
  })
  socket.on('setDate', (timestamp) => gameTimes.setDate(parseInt(timestamp)))
  socket.on('setFormat', (format) => gameTimes.setFormat(String(format)))
  socket.on('setReverseTime', (reverse) => gameTimes.setReverseTime(reverse))
  socket.on('getDateAfterStart', () =>  socket.emit('DateAfterStart', gameTimes.getDateAfterStart()))
  socket.on('setTask', (task) => typeof task === 'object' ? gameTimes.setTask(task) : socket.emit('getTask', {error: 'task not object'}))
  



  socket.on('disconnect', () => {
    clients.splice(clients.indexOf(socket.id), 1)
    console.log(`Client with id ${socket.id} disconnected`)
  })

  startSandtime(socket)
})



app.use(express.static(__dirname))

app.get('/', (req, res) => res.render('index'))


//отправка сообщения конкретному клиенту по его id
// app.post('/client/:id', (req, res) => {
//   if (clients.indexOf(req.params.id) !== -1) {
//     io.sockets.connected[req.params.id].emit(
//       'private message',
//       `Message to client with id ${req.params.id}`
//     )
//     return res
//       .status(200)
//       .json({
//         message: `Message was sent to client with id ${req.params.id}`,
//       })
//   } else
//     return res
//       .status(404)
//       .json({ message: 'Client not found' })
// })

http.listen(port, host, () =>
  console.log(`Server listens http://${host}:${port}`)
)