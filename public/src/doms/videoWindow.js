const videoWindows = (data)=>{
    let co = 0
    let doms = data.map((i,index)=>{
        if(i.id == userId){
            co = 1
            console.log(data.length)
            console.log(i.id)
            if(index == data.length-1){
                return `
                    <div class="videoWarpp final">
                    <div class="damyVideo">
                        <video id="video" width="600" height="500" class="videoPlayer myvideowindow" muted="muted" width="600" height="500" autoplay></video>
                    </div>
                    <div class="videoUserNameWarpp">
                        <span class="videoUserName">${i.userName}</span>
                    </div>
                    </div>
            `
            }else{
                return `
                <div class="videoWarpp">
                <div class="damyVideo">
                    <video id="video" width="600" height="500" class="videoPlayer myvideowindow" muted="muted" width="600" height="500" autoplay></video>
                </div>
                <div class="videoUserNameWarpp">
                    <span class="videoUserName">${i.userName}</span>
                </div>
                </div>
        `
            }
        }else{
            if(index == data.length-1){
                return `
                <div class="videoWarpp  final main-${i.id}">
                <div class="damyVideo">
                    <video id="video2" width="600" height="500" class="videoPlayer othervideowindow id-${i.id}" muted="muted" width="600" height="500" autoplay></video>
                </div>
                <div class="videoUserNameWarpp">
                    <span class="videoUserName">${i.userName}</span>
                </div>
                </div>
                `
            }else{
                return `
                <div class="videoWarpp main-${i.id}">
                <div class="damyVideo">
                    <video id="video2" width="600" height="500" class="videoPlayer othervideowindow id-${i.id}" muted="muted" width="600" height="500" autoplay></video>
                </div>
                <div class="videoUserNameWarpp">
                    <span class="videoUserName">${i.userName}</span>
                </div>
                </div>
                `
            }
        }
    }).join("")
    let test = `
    <span >${"test1"}</span>
    <video id="video" class="myvideowindow" muted="muted" width="600" height="500" autoplay></video>
    <span>${"test2"}</span>
    <video id="video2" class="othervideowindow" muted="muted" autoplay></video>
    `
    return doms
}
const newUserWindow = (id,name)=>{
    console.log(id)
    let dom = `
    <div class="videoWarpp final main-${id}">
    <div class="damyVideo">
        <video id="video2" width="600" height="500" class="videoPlayer othervideowindow id-${id}" muted="muted" width="600" height="500" autoplay></video>
    </div>
    <div class="videoUserNameWarpp">
        <span class="videoUserName">${name}</span>
    </div>
    </div>
    `
    return dom
}   