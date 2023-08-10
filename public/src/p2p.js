

let p2pID = window.sessionStorage.getItem(["userID"])
let con;
let aite = ""
let conList = []
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
    host: 'localhost',
    port: 9000,
    path: '/',
}); 
const connectP2P = (userList) =>{
    console.log(userList)
    if(peer){
        try{
            // if(userList.length == 2){
            //     con = peer.connect(userList[0].id)
            // }else{
            // }
            // if(con){
            //     con.on("open",()=>{
            //         console.log("接続に成功")
            //         aite = userList[0].id
            //         con.send(p2pID)
            //     })
            // }


            userList.forEach((i)=>{
                console.log(i)
                if(i.id != p2pID){
                    console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb")
                    conList.push(peer.connect(i.id))
                    conList[conList.length-1].send(p2pID)
                    conList[conList.length-1].on("open",()=>{
                        console.log("接続に成功"+i.id)
                        aite = userList[0].id
                        conList[conList.length-1].send(p2pID)
                    })
                }
            })
        }catch(error){
            console.log(error)
        }
    }
}
const connectP2P2 = (id)=>{
    if(peer){
        try{
            // con = peer.connect(id)
            // if(con){
            //     con.on("open",()=>{
            //         console.log("接続に成功")
            //         aite = id
            //         // con.send(p2pID)
            //     })
            // }
            console.log(userList)
            userList.forEach((i)=>{
                if(i.id == p2pID){
                    console.log("ccccccccccccccccccccccccccccccccc")
                    conList.push(peer.connect(i.id))
                    // conList[conList.length-1].send(p2pID)
                    // aite = id
                    conList[conList.length-1].on("open",()=>{
                        console.log("接続に成功"+i.id)
                        aite = userList[0].id
                        conList[conList.length-1].send(p2pID)
                    })
                }
            })
            // conList.push(con)
        }catch{
            console.log("error")
        }
    }

}
peer.on('connection',conn=>{
    console.log(conn.peer)
    console.log("接続されました"+conn.peer)
    conn.on("data",(data)=>{
        userList.push({id:data,state:"nomal"})
        connectP2P2(data)
        media.then((stream) => {
            userList.forEach((i)=>{
                console.log("iiiiiiiiiiiiiiiiiiiiiii")
                console.log(i)
                if(i.id != userId){
                    peer.call(i.id,stream)
                }
            })
        })
    })
})
const getVideo = (getId)=>{
    let video2
    video2 = document.getElementsByClassName("id-"+getId)
    console.log(video2)
    return video2
}

peer.on("call",(call)=>{
    let getId = call.peer
    console.log(getId)
    let video2 = getVideo(getId)
    console.log(video2)
    if(video2.length>0){
        console.log(aite.length)
        // if(aite.length > 0){
            call.answer();
            call.on('stream', (stream) => {
                video2[0].srcObject = stream;
                video2[0].play();
            });
        }
    // }
})