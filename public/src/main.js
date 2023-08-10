const firstLoad = async()=>{
    let userID = document.querySelector(".userID").textContent
    socket.emit("sendUserId",userID)
    window.sessionStorage.setItem(["userID"],userID)
    let data = await axios.get("/api/getroomlist")
    let roomList = document.querySelector(".roomIDList")
    console.log(data.data)
    let dom = roomListDom(data.data)
    roomList.innerHTML = dom
}
const moveCreate = ()=>{
    location.href = "/createroom"
}
firstLoad()