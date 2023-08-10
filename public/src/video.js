let videoTag;
let camFLG = true
let mkFLG = true
let media;
let path = location.pathname
let roomId = path.split("/")[2]
let userId = window.sessionStorage.getItem(["userID"])
let userList;
const firstFun = ()=>{
    userList = []
}
const init = (data)=>{
    let videos = document.querySelector(".videos")
    console.log(data)
    videos.innerHTML = videoWindows(data)
    getVideo()
    connectP2P(userList)
    videoTag = document.querySelector(".myvideowindow")
    media = navigator.mediaDevices.getUserMedia({
        video:camFLG,
        audio:mkFLG
    })
    media.then((stream) => {
        // if(aite){
            video.srcObject = stream;
            console.log(aite)
            userList.forEach((i)=>{
                console.log("gggggggggggggggggg")
                console.log(i)
                if(i.id != userId){
                    peer.call(i.id,stream)
                }
            })
        // }
    });
}
const camOFF = ()=>{
    camFLG = false
    let takes = document.getElementById("video").srcObject.getTracks();
    console.log(takes)
    takes.forEach((data)=>{
        console.log(data.kind)
        if(data.kind == "video"){
            data.stop()
        }
    })
    // document.getElementById('video').srcObject = null;
}
const camON = ()=>{
    camFLG = true
    videoTag = null
    media = null
    videoTag = document.getElementById("video")
    media = navigator.mediaDevices.getUserMedia({
        video:camFLG,
        audio:mkFLG
    })
    media.then((stream) => {
        video.srcObject = stream;
    });

}
const changeCam = ()=>{
    if(camFLG){
        camOFF()
        let button = document.getElementById("camChangeButton")
        button.textContent = "camON"
    }else{
        camON()
        let button = document.getElementById("camChangeButton")
        button.textContent = "camOFF"
    }
}
const oudioON = ()=>{
    mkFLG = true
    let takes = document.getElementById("video").srcObject.getTracks();
    console.log(takes)
    takes.forEach((data)=>{
        console.log(data.kind)
        if(data.kind == "oudio"){
            data.enabled = true
        }
    })
}
const oudioOFF = ()=>{
    mkFLG = false
    let takes = document.getElementById("video").srcObject.getTracks();
    console.log(takes)
    takes.forEach((data)=>{
        console.log(data.kind)
        if(data.kind == "oudio"){
            data.enabled = false
        }
    })
}
const changeOudio = ()=>{
    if(mkFLG){
        oudioOFF()
        let button = document.getElementById("mikeChangeButton")
        button.textContent = "mikeON"
    }else{
        oudioON()
        let button = document.getElementById("mikeChangeButton")
        button.textContent = "mikeOFF"
    }
}
const socketInfo = ()=>{
    console.log(userId)
    socket.emit("sendUserId",userId)
}
const deleteRoom = ()=>{
    userList = []
    socket.emit("deleteRoom",{roomId:roomId,userId:userId})
    roomId = ""
}
socketInfo()
console.log(roomId)
socket.emit("videoPageFlg",roomId)
socket.on("startVideoSystem",(data)=>{
    userList = data
    console.log(data)
    // firstFun()
    init(data)
    // connectP2P(data)
})
socket.on("joinNewUser",(data)=>{
    let videos = document.querySelector(".final")
    if(videos){
        videos.classList.remove("final")
        videos.insertAdjacentHTML('beforebegin',newUserWindow(data,"name"))
    }
    console.log(data)
    console.log(media.stream)
    media.then((stream)=>{
        console.log(data)
    //    peer.call(data,stream)
    })
socket.on("disconUser",(data)=>{
    console.log("listlistlsti")
    userList = data.newList
    let dom = document.getElementsByClassName("main-"+data.userId)
    console.log(dom[0])
    dom[0].remove()
    let videos = document.querySelector(".videos")
    let firstDom = videos.firstElementChild
    firstDom.classList.add("final")
    
    /////////////////////////現在の一番上にfinalを設定
})
    // media.then((stream) => {
    //     video.srcObject = stream;
    //     console.log(aite)
    //     peer.call(aite,stream)
    // });
    
    // media.then((stream) => {
    //     video.srcObject = stream;
    //     console.log(data)
    //     peer.call(aite,stream)
    // });
})