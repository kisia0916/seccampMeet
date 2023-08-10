const router = require("express").Router()
const roomList = require("../datas/data")
router.get("/roomlist",(req,res)=>{
    let sendData = roomList
    console.log(sendData)
    try{
        return res.status(200).json(sendData)
    }catch{
        return res.status(500).json("error")
    }  
})
module.exports = router