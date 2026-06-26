document.addEventListener('DOMContentLoaded', function() {
    // Font Awesome for icons (loading from CDN)
    const fontAwesome = document.createElement('link');
    fontAwesome.rel = 'stylesheet';
    fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css';
    document.head.appendChild(fontAwesome);

    // Music player elements
    const audio = new Audio();
    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const repeatBtn = document.getElementById('repeat-btn');
    const shuffleBtn = document.getElementById('shuffle-btn');
    const repeatModeBtn = document.getElementById('repeat-mode-btn');
    const shuffleModeBtn = document.getElementById('shuffle-mode-btn');
    const progressBar = document.getElementById('progress-bar');
    const progress = document.getElementById('progress');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    const songTitleEl = document.getElementById('song-title');
    const songArtistEl = document.getElementById('song-artist');
    const albumArtEl = document.getElementById('album-art');
    const playlistEl = document.getElementById('playlist');
    const searchInput = document.getElementById('search-input');

    // Player state
    let isPlaying = false;
    let isRepeat = false;
    let isShuffle = false;
    let currentSongIndex = 0;
    let filteredSongs = [];

    // Sample song data (you can replace with your own)
    const songs = [
       

        {
            title: "Blinding Lights",
            artist: "The Weeknd",
            src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
            cover: "https://i1.sndcdn.com/artworks-Eke4dWZTIrXCkXPW-hX2ihg-t500x500.jpg",
            duration: "3:20"
        },
        {
            title: "Save Your Tears",
            artist: "The Weeknd",
            src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
            cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIVWZGn9Eb8UA1u3uUlbwhJWwuYReFv7NJhw&s",
            duration: "3:35"
        },
        {
            title: "Stay",
            artist: "The Kid LAROI, Justin Bieber",
            src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
            cover: "https://i.scdn.co/image/ab67616d00001e02a3dfb0a1b8c2a7d6a7b9b5a5",
            duration: "2:21"
        },
        {
            title: "Good 4 U",
            artist: "Olivia Rodrigo",
            src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
            cover: "https://i.scdn.co/image/ab67616d00001e02a3dfb0a1b8c2a7d6a7b9b5a5",
            duration: "2:58"
        },
        {
            title: "Levitating",
            artist: "Dua Lipa",
            src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
            cover: "https://i.scdn.co/image/ab67616d00001e02a3dfb0a1b8c2a7d6a7b9b5a5",
            duration: "3:23"
        },
        {
            title: "Montero",
            artist: "Lil Nas X",
            src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
            cover: "https://i.scdn.co/image/ab67616d00001e02a3dfb0a1b8c2a7d6a7b9b5a5",
            duration: "2:17"
        },
        {
            title: "Peaches",
            artist: "Justin Bieber",
            src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
            cover: "https://i.scdn.co/image/ab67616d00001e02a3dfb0a1b8c2a7d6a7b9b5a5",
            duration: "3:18"
        },

        {
            title: "No Guidance Remix",
            artist: "Ayzha Nyree",
            src: "songs/song1.mp3",
            cover: "cover/song1.jpg",
            duration: "4:20"
        },

        {
            title: "My Hero Academia OST",
            artist: "Unknown",
            src: "songs/song2.mp3",
            cover: "cover/song1.jpg",
            duration: "06:42"
        },

        {
            title: "Sweet",
            artist: "Unknown",
            src: "songs/song3.mp3",
            cover: "cover/song1.jpg",
            duration: "03:37"
        },
    ];

    // Initialize filtered songs
    filteredSongs = [...songs];

    // Render playlist
    function renderPlaylist() {
        playlistEl.innerHTML = '';
        filteredSongs.forEach((song, index) => {
            const songEl = document.createElement('div');
            songEl.classList.add('playlist-item');
            if (index === currentSongIndex && isPlaying) {
                songEl.classList.add('active');
            }
            songEl.innerHTML = `
                <span class="song-name">${song.title}</span>
                <span class="song-duration">${song.duration}</span>
            `;
            songEl.addEventListener('click', () => playSong(index));
            playlistEl.appendChild(songEl);
        });
    }

    // Play song
    function playSong(index) {
        if (index < 0 || index >= filteredSongs.length) return;
        
        currentSongIndex = index;
        const song = filteredSongs[currentSongIndex];
        
        audio.src = song.src;
        songTitleEl.textContent = song.title;
        songArtistEl.textContent = song.artist;
        albumArtEl.src = song.cover;
        
        audio.play()
            .then(() => {
                isPlaying = true;
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                renderPlaylist();
            })
            .catch(error => {
                console.error("Playback failed:", error);
            });
    }

    // Toggle play/pause
    function togglePlay() {
        if (isPlaying) {
            audio.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            if (audio.src) {
                audio.play();
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                playSong(0);
            }
        }
        isPlaying = !isPlaying;
        renderPlaylist();
    }

    // Next song
    function nextSong() {
        if (isShuffle) {
            currentSongIndex = Math.floor(Math.random() * filteredSongs.length);
        } else {
            currentSongIndex = (currentSongIndex + 1) % filteredSongs.length;
        }
        playSong(currentSongIndex);
    }

    // Previous song
    function prevSong() {
        if (audio.currentTime > 3) {
            // If more than 3 seconds into song, restart it
            audio.currentTime = 0;
        } else {
            // Otherwise go to previous song
            currentSongIndex = (currentSongIndex - 1 + filteredSongs.length) % filteredSongs.length;
            playSong(currentSongIndex);
        }
    }

    // Update progress bar
    function updateProgress() {
        const { duration, currentTime } = audio;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        
        // Format time
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) durationSeconds = `0${durationSeconds}`;
        
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) currentSeconds = `0${currentSeconds}`;
        
        // Avoid NaN display
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }

    // Set progress
    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    }

    // Toggle repeat
    function toggleRepeat() {
        isRepeat = !isRepeat;
        repeatBtn.classList.toggle('active', isRepeat);
        audio.loop = isRepeat;
    }

    // Toggle shuffle
    function toggleShuffle() {
        isShuffle = !isShuffle;
        shuffleBtn.classList.toggle('active', isShuffle);
    }

    // Set repeat mode
    function setRepeatMode() {
        isRepeat = true;
        isShuffle = false;
        audio.loop = true;
        repeatModeBtn.classList.add('active');
        shuffleModeBtn.classList.remove('active');
        repeatBtn.classList.add('active');
        shuffleBtn.classList.remove('active');
    }

    // Set shuffle mode
    function setShuffleMode() {
        isShuffle = true;
        isRepeat = false;
        audio.loop = false;
        shuffleModeBtn.classList.add('active');
        repeatModeBtn.classList.remove('active');
        shuffleBtn.classList.add('active');
        repeatBtn.classList.remove('active');
    }

    // Search songs
    function searchSongs() {
        const searchTerm = searchInput.value.toLowerCase();
        filteredSongs = songs.filter(song => 
            song.title.toLowerCase().includes(searchTerm) || 
            song.artist.toLowerCase().includes(searchTerm)
        );
        
        if (filteredSongs.length === 0) {
            filteredSongs = [...songs];
        }
        
        currentSongIndex = 0;
        renderPlaylist();
    }

    // Event listeners
    playBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    repeatBtn.addEventListener('click', toggleRepeat);
    shuffleBtn.addEventListener('click', toggleShuffle);
    repeatModeBtn.addEventListener('click', setRepeatMode);
    shuffleModeBtn.addEventListener('click', setShuffleMode);
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', () => {
        if (!isRepeat) {
            nextSong();
        } else {
            audio.currentTime = 0;
            audio.play();
        }
    });
    progressBar.addEventListener('click', setProgress);
    searchInput.addEventListener('input', searchSongs);

    // Initialize
    renderPlaylist();
});