const display =  document.getElementById('display');

function extractFileName(path) {
    //let filename =  path.split("/").pop();
    let pathArray = path.match(/[^\/]+/g);
    let filename = pathArray.slice(-1)[0];
    let folder = pathArray.slice(-2, -1)[0].replaceAll('%20', ' ');
    console.log(folder, filename);
    //remove extension
    let name = filename.replace(/\.[^/.]+$/, "")
    console.log(folder, name);
    return {
    'folder' : folder,
     'name': name}
  }

function playSound(e) {
    const audio = document.querySelector(`#${e.key.toUpperCase()}`);
    if (!audio) return;
    const {folder,name} = extractFileName(audio.src);
    console.log(folder, name);
    const pad = audio.parentElement;
    console.log(pad);
    display.innerHTML = name;
    pad.classList.add('playing');
    audio.currentTime = 0;
    audio.play();
    audio.onended = function() {
        display.innerHTML = folder;
      }
    }

  //const pads = Array.from(document.querySelectorAll('.drum-pad'));
  //keys.forEach(key => key.addEventListener('transitionend', removeTransition));

  window.addEventListener('keydown', playSound);