let p2pID = window.sessionStorage.getItem(["userID"])
let con;
let aite = ""
console.log(userList)
// if(userList.length>0){
//     conn = peer.connect(userList[0].userId)
// }
// peer.on('open', () => {
//     console.log('client2に接続で');
//   });

// conn.on("connection",()=>{
//     console.log("他クライアントからの接続")
// })
let peer = new Peer(p2pID,{
    host: '172.17.0.121',
    port: 9000,
    path: '/',
}); 
const connectP2P = (userList) =>{
    console.log(userList)
    if(peer){
        try{
            if(userList.length == 2){
                con = peer.connect(userList[0].id)
            }else{
            }
            if(con){
                con.on("open",()=>{
                    console.log("接続に成功")
                    aite = userList[0].id
                    con.send(p2pID)
                })
            }
        }catch(error){
            console.log(error)
        }
    }
}
const connectP2P2 = (id)=>{
    if(peer){
        try{
            con = peer.connect(id)
            if(con){
                con.on("open",()=>{
                    console.log("接続に成功")
                    aite = id
                    // con.send(p2pID)
                })
            }
            // conList.push(con)
        }catch{
            console.log("error")
        }
    }

}
peer.on('connection',conn=>{
    console.log("接続されました")
    conn.on("data",(data)=>{
        connectP2P2(data)
    })
})
const getVideo = ()=>{
    let video2 = document.getElementById("video2")
    return video2
}
peer.on("call",(call)=>{
    let video2 = getVideo()
    console.log("call")
    // if(video2){
        console.log(aite.length)
        // if(aite.length > 0){
            call.answer();
            call.on('stream', (stream) => {
                video2.srcObject = stream;
                video2.play();
            });
        // }
    // }
})