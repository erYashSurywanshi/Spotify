console.log('wellcome to js'); 

let songIndex=0;
let audioElement =new Audio ('1.mp3');
let masterplay =document.getElementById('masterplay');
let myprogressBar =document.getElementById('myprogressBar');
let gif = document.getElementById('gif');
let mastersongname = document.getElementById('mastersongname');

let songItems = Array.from(document.getElementsByClassName("songItem"))

let songs=[
    {songName:"kuley-Kuley", filepath:'a1.mp3',coverpath:'maxresdefault.jpg'},
    {songName:"He vighna harta ", filepath:'a2.mp3',coverpath:'p2.png'},
    {songName:"sheesha down", filepath:'a3.mp3',coverpath:'maxresdefault.jpg'},
    {songName:"ones apon time", filepath:'a4.mp3',coverpath:'maxresdefault.jpg'},
    {songName:"2.0 kuley-Kuley", filepath:'a1.mp3',coverpath:'maxresdefault.jpg'},
    {songName:" 0.0 kuley-Kuley", filepath:'a1.mp3',coverpath:'maxresdefault.jpg'},

]

songItems.forEach((element,i)=>{
    element.getElementsByTagName('img')[0].src =songs[i].coverpath;
    element.getElementsByClassName('songName')[0].innerText =songs[i].songName;

})
// audio play

//Handle play/pause click
masterplay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterplay.classList.remove('fa-play')
        masterplay.classList.add('fa-pause')
        gif.style.opacity=1;

    }else{
        audioElement.pause();
        masterplay.classList.remove('fa-pause')
        masterplay.classList.add('fa-play')
        gif.style.opacity=0;

    }
})
// Listen to audio
// audioElement.play();
audioElement.addEventListener('timeupdate',()=>{
    // Update seekbar
    progress =parseInt((audioElement.currentTime/audioElement.duration)*100);
    myprogressBar.value=progress;
})


// So there is the cache 
// 1. audioElement.currentTime/ divided by audioElement.duration*100
// So2.the result persnt is myprogressBar
// and3.myprogressBar* audioElement.duration is divided by /  100 that is revers of the past
myprogressBar.addEventListener("change",()=>{
       audioElement.currentTime= myprogressBar.value*audioElement.duration/100;
})


const makeAllplay=()=>{

    Array.from(document.getElementsByClassName('songItemplay')).forEach((element)=>{
        element.classList.remove("fa-circle-pause");
        element.classList.add("fa-circle-play");
    })
}

Array.from(document.getElementsByClassName('songItemplay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllplay();
        songIndex= parseInt(e.target.id)
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `${songIndex+1}.mp3`;
        mastersongname.innerText=songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterplay.classList.remove('fa-circle-play')
        masterplay.classList.add('fa-circle-pause')

    })

})
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>9){
        songIndex=0
    }
    else{
        songIndex+=1;
    }
    audioElement.src = `${songIndex+1}.mp3`;
    audioElement.currentTime=0;
    mastersongname.innerText=songs[songIndex].songName;

    audioElement.play();
    gif.style.opacity=1;

    masterplay.classList.remove('fa-circle-play')
    masterplay.classList.add('fa-circle-pause')
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0
    }
    else{
        songIndex-=1;
    }
    audioElement.src = `${songIndex+1}.mp3`;
    audioElement.currentTime=0;
    mastersongname.innerText=songs[songIndex].songName;
    audioElement.play();
    masterplay.classList.remove('fa-circle-play')
    masterplay.classList.add('fa-circle-pause')
})