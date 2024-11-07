// Sample song data with album covers
const songs = [
  { title: "Emaphupeni", artist: "Kelvin Momo", duration: "9:08", file: "song1.mp3", albumCover: "cover.jpg" },
  { title: "Izono", artist: "Kelvin Momo", duration: "9:20", file: "song2.mp3", albumCover: "cover.jpg" },
  { title: "Amaloolo", artist: "Kelvin Momo", duration: "8:25", file: "song3.mp3", albumCover: "cover.jpg" },
];

let currentSongIndex = 0;
const audioPlayer = document.getElementById('audio-player');
const songList = document.getElementById('song-list');
const currentSongTitle = document.getElementById('current-song-title');
const albumCover = document.getElementById('album-cover');
const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const volumeControl = document.getElementById('volume-control');
const volumeDisplay = document.getElementById('volume-display');
const progressBar = document.getElementById('progress-bar');

// Function to update the song display and album cover
function updateSongDisplay() {
  currentSongTitle.textContent = `${songs[currentSongIndex].title} - ${songs[currentSongIndex].artist}`;
  albumCover.src = songs[currentSongIndex].albumCover;  // Update the album cover image
  audioPlayer.src = songs[currentSongIndex].file;
  audioPlayer.load();
  audioPlayer.play();
}

// Load the playlist
songs.forEach((song, index) => {
  const li = document.createElement('li');
  li.textContent = `${song.title} - ${song.artist} (${song.duration})`;
  li.addEventListener('click', () => {
    currentSongIndex = index;
    updateSongDisplay();
  });
  songList.appendChild(li);
});

// Play/Pause button functionality
playPauseBtn.addEventListener('click', () => {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playPauseBtn.textContent = 'Pause';
  } else {
    audioPlayer.pause();
    playPauseBtn.textContent = 'Play';
  }
});

// Next song button functionality
nextBtn.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  updateSongDisplay();
});

// Previous song button functionality
prevBtn.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  updateSongDisplay();
});

// Volume control functionality
volumeControl.addEventListener('input', () => {
  audioPlayer.volume = volumeControl.value;
  volumeDisplay.textContent = `Volume: ${(volumeControl.value * 100).toFixed(0)}%`;
});

// Progress bar functionality
audioPlayer.addEventListener('timeupdate', () => {
  const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progressBar.value = progress;
});

progressBar.addEventListener('input', () => {
  const newTime = (progressBar.value / 100) * audioPlayer.duration;
  audioPlayer.currentTime = newTime;
});

// Initialize the first song display
updateSongDisplay();
