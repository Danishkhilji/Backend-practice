let express = require("express");
const path = require("path"); // Import the path module

let app = express();
app.use(express.json())


app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/socket-client', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'socket-client.html'));
});

let port =5000
let server = app.listen(port,()=>{
    console.log("Server running on port :", port)
})
 
let io = require('./config/socket')
io.init(server)

let taskRoute = require("./routes/task"); 
app.use("/api/",taskRoute )
