let express = require("express");
let socketIO = require("socket.io")
let http = require("http")

let app = express();
let server = http.createServer(app)

app.use(express.json())

let io = socketIO(server)
app.use((req, res, next) => {
    app.set('io', io);
    next();
  });
let taskRoute = require("./routes/task"); 
app.use("/api/",taskRoute )

io.on('connection',(socket)=>{
    console.log("A user has been connected")
})
let port =5000
app.listen(port,()=>{
    console.log("Server running on port :", port)
})

module.exports = { io,app};