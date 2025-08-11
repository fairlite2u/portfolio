const presses = {};
window.addEventListener('keydown', function (e) {
    console.log(e);
    const keyCode = e.code;
    const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
    
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();

    const key = document.querySelector(`div.key[data-key="${keyCode}"]`);
    key.classList.add('playing');
    audio.addEventListener('ended', function () {
        key.classList.remove('playing');
    });

    // Stretch
    if (presses[keyCode] === undefined) presses[keyCode] = 0;
    else if (presses[keyCode] < 10) {
        key.style.transform += "translateY(10px)";
        presses[keyCode]++;
    } 
    else {
        key.style.transform = "translateY(0px)";
        presses[keyCode] = 0;
    }

});

document.addEventListener('keydown', console.log.bind(console));