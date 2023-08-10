let roomList = [
    {id:"123456",roomName:"testRoom1",user:[],setting:{audio:true,video:true}}
]
const changeList = (newList)=>{
    roomList = newList
    console.log(roomList)
}
module.exports = {data:roomList,changeFun:changeList}