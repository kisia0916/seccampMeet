const videoWindows = (data)=>{
    let co = 0
    let doms = data.map((i,index)=>{
        if(co == 0){
            co = 1
            console.log(data.length)
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
                <div class="videoWarpp  final">
                <div class="damyVideo">
                    <video id="video2" width="600" height="500" class="videoPlayer othervideowindow" muted="muted" width="600" height="500" autoplay></video>
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
                    <video id="video2" width="600" height="500" class="videoPlayer othervideowindow" muted="muted" width="600" height="500" autoplay></video>
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
const newUserWindow = (data)=>{
    let dom = `
    <div class="videoWarpp final">
    <div class="damyVideo">
        <video id="video2" width="600" height="500" class="videoPlayer othervideowindow " muted="muted" width="600" height="500" autoplay></video>
    </div>
    <div class="videoUserNameWarpp">
        <span class="videoUserName">${data.userName}</span>
    </div>
    </div>
    `
    return dom
}   