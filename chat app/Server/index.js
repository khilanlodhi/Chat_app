const http=require("http");
const express=require("express");
const cors=require("cors");
const socketio=require("socket.io");

const app=express();
const port=4500 || process.env.PORT;

const users=[{}];
//let message;
//let user;




app.get(cors());
app.get("/",(req,res)=>{
    res.end("Thankk god its working");
})


const server=http.createServer(app);

const io=socketio(server);


io.on("connection",(socket)=>{
console.log("new connection");

socket.on("joined",({user})=>{
    users[socket.id]=user;
console.log(`${user} has joined`);
socket.emit("welcome",{user:'Admin',message:`welcome to the chat ${user}`})
socket.broadcast.emit("userjoined",{user:'Admin',message:` ${user} had joined`})
})
socket.on('message',({message,id})=>{
  io.emit('sendmessage',{user:users[id],message,id})
})
    socket.on('lostconnection',()=>{
        socket.broadcast.emit('leave',{user:'Admin',message:`user has left`})
        console.log("user left");
        
    })
    
   
});

server.listen(port,()=>{
    console.log(`server is working on http://localhost:${port}`);
})