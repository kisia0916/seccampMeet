const roomListDom = (data)=>{
    let listDom = data.map((i)=>{
        return `
        <div class="roomWarpp">
        <div class="roomNameWarpp">
            <span class="roomNameText">${i.roomName}</span>
        </div>
        <div class="roomPerson">
            <i class="ri-user-fill roomPersonIcon"></i>
            <span class="roomPersonText">3</span>
            <i class="ri-link roomLinkIcon"></i>

        </div>
    </div>
        `
    }).join("")
    let html = `
        ${listDom}
    `
    return html
}