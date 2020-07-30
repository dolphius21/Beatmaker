class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll('.pad')
    this.playBtn = document.querySelector('.play')
    this.kickAudio = document.querySelector('.kick-sound')
    this.snareAudio = document.querySelector('.snare-sound')
    this.hihatAudio = document.querySelector('.hihat-sound')
    this.index = 0;
    this.bpm = 150;
  }

  activePad() {
    this.classList.toggle('active');

  }

  repeat() {
    let steps = this.index % 8;
    const activePads = document.querySelectorAll(`.b${steps}`)
    // Loop over the pads
    activePads.forEach(pad => {
      pad.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
      // Check if pad is active
      if (pad.classList.contains('active')) {
        if (pad.classList.contains('kick-pad')) {
          this.kickAudio.play();
        }
        if (pad.classList.contains('snare-pad')) {
          this.snareAudio.play();
        }
        if (pad.classList.contains('hihat-pad')) {
          this.hihatAudio.play();
        }
      }
    });
    this.index++;
  }
  
  start() {
    const interval = (60/this.bpm) * 1000;
    setInterval(() => {
      this.repeat();
    }, interval);
  }
}

const drumKit = new DrumKit();

drumKit.pads.forEach(pad => {
  pad.addEventListener('click', drumKit.activePad);
  pad.addEventListener('animationend', () => {
    pad.style.animation = '';
  });
});

drumKit.playBtn.addEventListener('click', () => {
  drumKit.start();
});