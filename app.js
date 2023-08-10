const express = require("express")
const app = express()
const http = require("http")
const ejs = require("ejs")
const body_pase = require("body-parser")
const path = require("path")
const server = http.createServer(app)
const io = require("socket.io")(server)
const fs = require("fs")
const { v4: uuidv4 } = require('uuid');
let session = require('express-session'); 
const indexPage = fs.readFileSync("./public/views/index.ejs","utf-8")
const mainPage = fs.readFileSync("./public/views/main.ejs","utf-8")
const tellPage = fs.readFileSync("./public/views/tell.ejs","utf-8")
const noRoomPage = fs.readFileSync("./public/views/noRoom.ejs","utf-8")
const createPage = fs.readFileSync("./public/views/createRoom.ejs","utf-8")
const getDataAPI = require("./router/getDatas")


let roomList = [
    {id:"123456",roomName:"testRoom1",pass:"",user:[],setting:{audio:true,video:true}}
]
let userList = [
    {userId:"12345",state:""}
]

app.use(express.json())
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie:{
    httpOnly: true,
    secure: false,
    maxage: null
    }
  }))
// app.use("/router", express.static("router"));
app.use("/viwes",express.static("views"))
app.use("/style",express.static("style"));
app.use("/public",express.static("public"))
app.use(body_pase.json());//////////////////////////////   ここ重要
app.use(body_pase.urlencoded({ extended: true }));//////
app.use(express.static(path.join(__dirname, "js")));

app.use("/getdatas",getDataAPI)

app.get("/",(req,res)=>{
    let pageRender = ejs.render(indexPage,{

    })
    res.writeHead(200,{"Content-Type":"text/html"})
    res.write(pageRender)
    res.end()
})
app.get("/main",(req,res)=>{
    
    req.session.userId = uuidv4()
    let pageRender = ejs.render(mainPage,{
        userId:req.session.userId
    })
    res.writeHead(200,{"Content-Type":"text/html"})
    res.write(pageRender)
    res.end()
})
app.get("/tell/:id",(req,res)=>{
    console.log(req.session.testID)
    let roomFLG = false
    roomList.forEach((i)=>{
        if(i.id == req.params.id){
            roomFLG = true
        }
    })
    if(roomFLG){
        let pageRender = ejs.render(tellPage,{
            
        })
        res.writeHead(200,{"Content-Type":"text/html"})
        res.write(pageRender)
        res.end()
    }else{
        let pageRender = ejs.render(noRoomPage,{
            
        })
        res.writeHead(200,{"Content-Type":"text/html"})
        res.write(pageRender)
        res.end()
    }
})
app.get("/createroom",(req,res)=>{
    let pageRender = ejs.render(createPage,{
        
    })
    res.writeHead(200,{"Content-Type":"text/html"})
    res.write(pageRender)
    res.end()
})
app.get("/api/getroomlist",(req,res)=>{
    let sendData = roomList
    console.log(sendData)
    try{
        return res.status(200).json(sendData)
    }catch{
        return res.status(500).json("error")
    }  
})

io.on("connection",(socket)=>{
    let userId;
    console.log("con")
    socket.on("sendUserId",(data)=>{
        console.log("aaaaa")
        console.log(data)
        userId = data
        socket.join(userId)
        let flg = {flg:false,index:null}
        userList.forEach((i,index)=>{
            console.log(i)
            if(i.userId == userId){
                flg.flg = true
            }
        })
        if(!flg.flg){
            userList.push({userId:userId,state:""})
            console.log(console.log(userList))
        }
    })
    socket.on("createRoom",(data)=>{
        console.log("aaaaaaaaaaaaaaaaa")
        let roomID = uuidv4()
        let roomName = data.roomName
        let pass = data.roomPass
        let user = data.user
        roomList.push({id:roomID,roomName:roomName,pass:pass,user:[user],setting:[]})
        console.log(roomList)
    })
    socket.on("videoPageFlg",(data)=>{
        roomList.forEach((i)=>{
            if(i.id == data){
                socket.join(i.id)
                i.user.push({id:userId,state:"nomal"})
                io.to(i.id).emit("joinNewUser",userId)
                io.to(userId).emit("startVideoSystem",i.user)
                console.log(i.user)
            }
        })

    })
    socket.on("disconnect",()=>{
        console.log("discon")
        let flg = {flg:false,index:null}
        userList.forEach((i,index)=>{
            if(i.userId == userId){
                flg.flg = true
                flg.index = index
            }
        })
        if(flg.flg){
            userList.splice(flg.index,1)
            console.log(userList)
        }

    })
})

server.listen(3000,()=>{
    console.log("server run")
})
