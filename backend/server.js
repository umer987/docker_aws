import express from "express";
import {createServer} from "http";
import { Server  } from "socket.io";
import { YSocketIO  } from "y-socket.io/dist/server";


const app = express()
const httpserver = createServer(app)
app.use(express.static("public"))
const io = new Server(httpserver,{
    cors:{
        origin:"*",
        methods:["GET", "POST"]
    }
})
const mySocketIO = new YSocketIO(io)
mySocketIO.initialize()

// app.get("/",(req,res)=>{
//     res.status(200).json({
//         message:"server health 100",
//         sucess:"true"
//     })
// })
app.get("/health",(req,res)=>{
    res.status(200).json({
        message:"server health 100",
        sucess:"true"
    })
})
httpserver.listen(3000,()=>{
console.log("server is running on port 3000")
})