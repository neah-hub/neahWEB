/* ===========================
   ELEMENTS
=========================== */

const songsWindow = document.querySelector(".songs-window");
const galleryWindow = document.querySelector(".gallery-window");
const aboutWindow = document.querySelector(".about-window");
const portalsWindow = document.querySelector(".portals-window");

const servicesBtn = document.getElementById("songs-btn");
const homeBtn = document.getElementById("home-btn");

const clickSound = document.getElementById("clickSound");

/* ===========================
   PLAYLIST
=========================== */

const playlist = [
    document.getElementById("song1"),
    document.getElementById("song2"),
    document.getElementById("song3"),
    document.getElementById("song4"),
    document.getElementById("song5"),
    document.getElementById("song6"),
    document.getElementById("song7")
];

let currentSong = 0;

/* ===========================
   DRAGGABLE WINDOWS
=========================== */

document.querySelectorAll(".window").forEach(window => {

    const titleBar = window.querySelector(".title-bar");

    let dragging = false;
    let offsetX = 0;
    let offsetY = 0;

    titleBar.addEventListener("mousedown", (e) => {

        dragging = true;

        offsetX = e.clientX - window.offsetLeft;
        offsetY = e.clientY - window.offsetTop;

        titleBar.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", (e) => {

        if (!dragging) return;

        window.style.left = `${e.clientX - offsetX}px`;
        window.style.top = `${e.clientY - offsetY}px`;
        window.style.right = "auto";

    });

    document.addEventListener("mouseup", () => {

        dragging = false;
        titleBar.style.cursor = "grab";

    });

});

/* ===========================
   WINDOW CONTROLS
=========================== */

// Songs

servicesBtn.addEventListener("click", (e) => {

    e.preventDefault();
    songsWindow.classList.add("open");

});

document.getElementById("close").onclick = () => {

    songsWindow.classList.remove("open");

};

// Gallery

document.getElementById("gallery-btn").addEventListener("click", (e) => {

    e.preventDefault();
    galleryWindow.classList.add("open");

});

document.querySelector(".gallery-close").onclick = () => {

    galleryWindow.classList.remove("open");

};

// About

document.getElementById("about-btn").addEventListener("click", (e) => {

    e.preventDefault();
    aboutWindow.classList.add("open");

});

document.querySelector(".about-close").onclick = () => {

    aboutWindow.classList.remove("open");

};

// Portals

document.getElementById("portals-btn").addEventListener("click", (e) => {

    e.preventDefault();
    portalsWindow.classList.add("open");

});

document.querySelector(".portals-close").onclick = () => {

    portalsWindow.classList.remove("open");

};

/* ===========================
   HOME BUTTON
=========================== */

homeBtn.addEventListener("click", (e) => {

    e.preventDefault();

    document.querySelectorAll(".window").forEach(window => {

        window.classList.remove("open");

    });

    document.querySelectorAll(".song-card").forEach(card => {

        card.classList.remove("playing");

    });

});

/* ===========================
   CLICK SOUND
=========================== */

document.querySelectorAll("button, a").forEach(element => {

    element.addEventListener("click", () => {

        clickSound.currentTime = 0;
        clickSound.play().catch(() => {});

    });

});

/* ===========================
   MUSIC PLAYER
=========================== */

function playSong(id) {

    playlist.forEach(song => {

        song.pause();
        song.currentTime = 0;

    });

    document.querySelectorAll(".song-card").forEach(card => {

        card.classList.remove("playing");

    });

    const song = document.getElementById(id);

    currentSong = playlist.indexOf(song);

    song.closest(".song-card").classList.add("playing");

    song.play();

}

function pauseSong(id) {

    const song = document.getElementById(id);

    song.pause();

    song.closest(".song-card").classList.remove("playing");

}

function volumeUp(id) {

    const song = document.getElementById(id);

    song.volume = Math.min(song.volume + 0.1, 1);

}

function volumeDown(id) {

    const song = document.getElementById(id);

    song.volume = Math.max(song.volume - 0.1, 0);

}

/* ===========================
   AUTO PLAY NEXT SONG
=========================== */

playlist.forEach((song, index) => {

    song.addEventListener("ended", () => {

        document.querySelectorAll(".song-card").forEach(card => {

            card.classList.remove("playing");

        });

        currentSong = (index + 1) % playlist.length;

        playlist[currentSong]
            .closest(".song-card")
            .classList.add("playing");

        playlist[currentSong].currentTime = 0;
        playlist[currentSong].play();

    });

});