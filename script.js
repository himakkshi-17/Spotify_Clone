
console.log("hi");

// initializing the variables

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');

let masterSongName = document.getElementById('masterSongName');

// get play button with ID
// get the progree bar with the ID

let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');

let previous = document.getElementById('previous');
let next = document.getElementById('next');

// take playing gif 
let gif = document.getElementById('gif');

// saare song items ko le lenge ek array k andar 

let songItems = Array.from(document.getElementsByClassName('songItem'));

// make an array of songs

let songs = [
    {songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Rabba - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/6.jpg"},
    {songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/7.jpg"},
    {songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/8.jpg"},
    {songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/9.jpg"},
    {songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/4.mp3", coverPath: "covers/10.jpg"},
]

// let songItems2 = document.getElementsByClassName("songItem");

// Array.from (songItems).forEach((element, i) =>{
//   const songNameElement = element.querySelector(".songName");
//   const durationElement = element.querySelector(".timestamp");
//   const coverImageElement = element.querySelector("img");

//   songNameElement.innerText = songs[i].songName;
//   durationElement.innerText = songs[i].duration;
//   coverImageElement.src = songs[i].coverPath;
//   coverImageElement.alt = songs[i].songName;
// )}

// harr song ka naammm aur image set kar rahe by using JS

function formatDuration(duration) {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function getDuration(src, cb) {
    var audio = new Audio('src');
    audio.addEventListener('loadedmetadata', function() {
        // Metadata is now available
        console.log('Metadata loaded!');
        console.log('Duration:', audio.duration);
        let songDuration = formatDuration(audio.duration);
        console.log(songDuration);
        return songDuration;
      });
}

songItems.forEach((element, i)=>{

    // console.log(element.getElementsByClassName('songName'[0]));

    element.getElementsByClassName ("songName")[0].innerText = songs[i].songName;
    let src = songs[i].filePath;
    element.getElementsByClassName("timestamp")[0].innerText = getDuration(src,i);

})



// kisi bhi song ko play karna ho toh 

let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'));

const makeAllPlays = ()=>{
    songItemPlay.forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

songItemPlay.forEach((element,e)=>{
    element.addEventListener('click', (e)=>{

        makeAllPlays();
        songIndex = parseInt(e.target.id);

        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');

        audioElement.src = `songs/${songIndex+1}.mp3`;// jis element par clk hua usse e se pakda aur fir uske corresponding sons ko play kar diya
        
        masterSongName.innerText = songs[songIndex].songName;
        
        audioElement.currentTime = 0;
        audioElement.play();

        gif.style.opacity = 1;

        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');

    })
})

// play and pause the song

masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }

    else if (audioElement.played){
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

// progress baar pr blue line should move

audioElement.addEventListener('timeupdate', ()=>{
    progress = parseInt ( (audioElement.currentTime / audioElement.duration)*100 );
    myProgressBar.value = progress;
})

// progree bar mai jaha bhi click kar do waha update hona chyi !!

myProgressBar.addEventListener('click', ()=>{
    // we will have to change percentage to time also
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100 ;
})


// let length = songs.length;


// Previous button

previous.addEventListener('click',()=>{


    if(songIndex == 0){
        songIndex = songs.length - 1 ;
    }
    else {
        songIndex--;
    }

    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    gif.style.opacity = 1;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

// next button

next.addEventListener('click',()=>{
    if(songIndex == songs.length){
        songIndex = 0;
    }

    else {
        songIndex ++ ;
    }

    audioElement.src = `songs/${songIndex + 1}.mp3` ;

    masterSongName.innerText = songs[songIndex].songName;

    audioElement.currentTime = 0 ;
    gif.style.opacity = 1;
    audioElement.play();

    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
