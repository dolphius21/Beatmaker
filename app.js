class DrumKit {
  constructor () {
    this.pads = document.querySelectorAll('.pad')
    this.playBtn = document.querySelector('.play')
    this.clapAudio = document.querySelector('.clap-sound')
    this.hihatAudio = document.querySelector('.hihat-sound')
    this.openhatAudio = document.querySelector('.openhat-sound')
    this.snareAudio = document.querySelector('.snare-sound')
    this.tomAudio = document.querySelector('.tom-sound')
    this.kickAudio = document.querySelector('.kick-sound')
    this.percAudio = document.querySelector('.perc-sound')
    this.index = 0
    this.bpm = 150
    this.isPlaying = null
    this.selects = document.querySelectorAll('select')
    this.muteBtns = document.querySelectorAll('.mute')
    this.tempoSlider = document.querySelector('.tempo-slider')
  }

  activePads() {
    // to toggle active
    this.classList.toggle('active');
  }

  repeat() {
    // to repeat beats
    const beats = this.index % 8;
    this.index++;
    const activeBeats = document.querySelectorAll(`.b${beats}`);
    activeBeats.forEach(beat => {
      beat.style.animation = `playTrack 0.1s alternate ease-out 2`;
      // check if beat is active
      if (beat.classList.contains('active')) {
        // check what sound is active
        if (beat.classList.contains('clap-pad')) {
          this.clapAudio.currentTime = 0;
          this.clapAudio.play();
        }
        if (beat.classList.contains('hihat-pad')) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
        if (beat.classList.contains('openhat-pad')) {
          this.openhatAudio.currentTime = 0;
          this.openhatAudio.play();
        }
        if (beat.classList.contains('snare-pad')) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (beat.classList.contains('tom-pad')) {
          this.tomAudio.currentTime = 0;
          this.tomAudio.play();
        }
        if (beat.classList.contains('kick-pad')) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (beat.classList.contains('perc-pad')) {
          this.percAudio.currentTime = 0;
          this.percAudio.play();
        }
      }
    });
  }

  start() {
    // set interval per beat
    const interval = (60 / this.bpm) * 1000;
    // check if this.isPlaying = null;
    if (!this.isPlaying) {
      // if true add interval
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
      // Update text of the button
      this.playBtn.innerText = 'Pause';
    } else {
      // if false clear interval
      clearInterval(this.isPlaying);
      this.isPlaying = null;
      // Update text of the button
      this.playBtn.innerText = 'Play';
    }
  }

  changeAudio(e) {
    const selectionName = e.target.name;
    const selectionValue = e.target.value;
    switch (selectionName) {
      case 'clap-select':
        this.clapAudio.src = selectionValue;
      break;
      case 'hihat-select':
        this.hihatAudio.src = selectionValue;
      break;
      case 'openhat-select':
        this.openhatAudio.src = selectionValue;
      break;
      case 'snare-select':
        this.snareAudio.src = selectionValue;
      break;
      case 'tom-select':
        this.tomAudio.src = selectionValue;
      break;
      case 'kick-select':
        this.kickAudio.src = selectionValue;
      break;
      case 'perc-select':
        this.percAudio.src = selectionValue;
      break;
    }
  }

  muteAudio(e) {
    console.log(e.target.firstElement);
    const muteIndex = e.target.getAttribute('data-track');
    e.target.classList.toggle('active');
    // check if target is active
    if (e.target.classList.contains('active')) {
      e.target.firstElementChild.className = 'fas fa-volume-mute';
      switch(muteIndex) {
        case '0' :
          this.clapAudio.volume = 0;
        break;
        case '1' :
          this.hihatAudio.volume = 0;
        break;
        case '2' :
          this.openhatAudio.volume = 0;
        break;
        case '3' :
          this.snareAudio.volume = 0;
        break;
        case '4' :
          this.tomAudio.volume = 0;
        break;
        case '5' :
          this.kickAudio.volume = 0;
        break;
        case '6' :
          this.percAudio.volume = 0;
        break;
      }
    } else {
      e.target.firstElementChild.className = 'fas fa-volume-up';
      switch(muteIndex) {
        case '0' :
          this.clapAudio.volume = 1;
        break;
        case '1' :
          this.hihatAudio.volume = 1;
        break;
        case '2' :
          this.openhatAudio.volume = 1;
        break;
        case '3' :
          this.snareAudio.volume = 1;
        break;
        case '4' :
          this.tomAudio.volume = 1;
        break;
        case '5' :
          this.kickAudio.volume = 1;
        break;
        case '6' :
          this.percAudio.volume = 1;
        break;
      }
    }
  }

  changeTempo(e) {
    const tempoText = document.querySelector('.tempo-nr');
    this.bpm = e.target.value;
    tempoText.innerText = e.target.value;
  }

  updateTempo() {
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    const playBtn = document.querySelector('.play');
    if (!this.isPlaying) {
      this.start();
    }
  }
}

// Instantiate DrumKit object
const drumkit = new DrumKit();

// Event Listeners
drumkit.pads.forEach(pad => {
  pad.addEventListener('click', drumkit.activePads);
  pad.addEventListener('animationend', () => {
    pad.style.animation = '';
  });
});

drumkit.playBtn.addEventListener('click', () => {
  drumkit.start();
});

drumkit.selects.forEach(select => {
  select.addEventListener('change', (e) => {
    drumkit.changeAudio(e);
  });
});

drumkit.muteBtns.forEach(mute => {
  mute.addEventListener('click', (e) => {
    drumkit.muteAudio(e);
  });
});

drumkit.tempoSlider.addEventListener('input', (e) => {
  drumkit.changeTempo(e);
});

drumkit.tempoSlider.addEventListener('change', () => {
  drumkit.updateTempo();
});