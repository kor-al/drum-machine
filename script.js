const display = document.getElementById('display');

function extractFileName(path) {
    //let filename =  path.split("/").pop(); //gives only filename
    let pathArray = path.match(/[^\/]+/g);
    let filename = pathArray.slice(-1)[0];
    let folder = pathArray.slice(-2, -1)[0].replaceAll('%20', ' ');
    //remove extension
    let name = filename.replace(/\.[^/.]+$/, "")
    return {
        'folder': folder,
        'name': name
    }
}

function playSound(audio) {
    if (!audio) return;
    const {
        folder,
        name
    } = extractFileName(audio.src);
    const pad = audio.parentElement;
    display.innerHTML = name;
    pad.classList.add('playing');
    audio.currentTime = 0;
    audio.play();
    audio.onended = function () {
        display.innerHTML = folder;
    }
}

function handleKeyDown(e) {
    const audio = document.querySelector(`#${e.key.toUpperCase()}`);
    console.log(audio.volume);
    playSound(audio);
}

function handleClick(e) {
    const audio = e.target.querySelector('audio');
    playSound(audio);

}

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
  }



function handleMove(e) {
    const y = e.pageY - this.offsetTop;
    const percent = 1 - y / this.offsetHeight;
    const min = 0.;
    const max = 1.;
    const height = Math.round(percent * 100) + '%';
    const vol = percent * (max - min) + min;
    bar.style.height = height;
    bar.textContent = vol.toFixed(1) + '×';
    Array.from(audios).forEach(aud => {aud.volume = vol});
    Array.from(audios).forEach(aud => {console.log(aud.volume)});
}


const pads = Array.from(document.querySelectorAll('.drum-pad'));
pads.forEach(pad => pad.addEventListener('click', handleClick));
pads.forEach(pad => pad.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', handleKeyDown);


//volume control
const volume = document.querySelector('.volume');
const bar = document.querySelector('.volume-bar');
const audios = document.querySelectorAll('.clip');
volume.addEventListener('mousemove', handleMove);



