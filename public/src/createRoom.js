const createRoom = ()=>{
    let roomName = document.querySelector(".createRoomName").value
    let roomPass = document.querySelector(".createRoomPass").value
    let userID = window.sessionStorage.getItem(["userId"])
    socket.emit("createRoom",{roomName:roomName,roomPass:roomPass,user:[userID]})
}