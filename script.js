/* ===========================
   ELEMENTS
=========================== */
console.log(window.supabase);
const songsWindow = document.querySelector(".songs-window");
const galleryWindow = document.querySelector(".gallery-window");
const aboutWindow = document.querySelector(".about-window");
const portalsWindow = document.querySelector(".portals-window");

const kissbookWindow = document.querySelector(".kissbook-window");
const kissBtn = document.getElementById("kiss-btn");

const servicesBtn = document.getElementById("songs-btn");
const homeBtn = document.getElementById("home-btn");

const clickSound = document.getElementById("clickSound");
const kissSound = document.getElementById("kissSound");
const zineOpenSound = document.getElementById("zineOpenSound");
const zineCloseSound = document.getElementById("zineCloseSound");
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

    titleBar.addEventListener("pointerdown", (e) => {

        dragging = true;

        offsetX = e.clientX - window.offsetLeft;
        offsetY = e.clientY - window.offsetTop;

        titleBar.style.cursor = "grabbing";
    });

    document.addEventListener("pointermove", (e) => {

        if (!dragging) return;

        window.style.left = `${e.clientX - offsetX}px`;
        window.style.top = `${e.clientY - offsetY}px`;
        window.style.right = "auto";

    });

    document.addEventListener("pointerup", () => {

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

// Kissbook

kissBtn.addEventListener("click", () => {

    kissSound.currentTime = 0;
    kissSound.play().catch(() => {});

    kissbookWindow.classList.add("open");

    setTimeout(loadComments, 300);

});

document.querySelector(".kissbook-close").onclick = () => {

    kissbookWindow.classList.remove("open");

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

/* ===========================
   COMMENTS
=========================== */


async function loadComments(){

    const container =
        document.getElementById("kissbook-comments");

    container.innerHTML = "";

    const { data, error } = await window.supabase
        .from("kissbook")
        .select("*")
        .order("created_at",{ascending:true});

    if(error){

        console.error(error);
        return;

    }

    data.forEach(comment=>{

        const date = new Date(comment.created_at);

        const now = new Date();

        const diff = Math.floor((now - date) / 1000);

        let formatted;

        if(diff < 60){

            formatted = "just now ♡";

        }else{

            formatted = date.toLocaleString([],{

                day:"2-digit",
                month:"short",
                year:"numeric",

                hour:"numeric",
                minute:"2-digit",

                hour12:true

            }).replace(",", " ♡");

        }

        if(window.innerWidth <= 699){

    container.innerHTML += `

    <div class="kiss-card">

        <h3>♡ @${comment.username}</h3>

        <p>${comment.message}</p>

        <span class="kiss-time">${formatted}</span>

    </div>

    `;

    }else{

        container.innerHTML += `

        <div class="kiss-card">

            <div class="kiss-header">

                <h3>♡ @${comment.username}</h3>

                <span class="kiss-time">${formatted}</span>

            </div>

            <p>${comment.message}</p>

        </div>

        `;

    }

    });

    container.scrollTop = container.scrollHeight;

}


/* ===========================
   POSTING COMMENTS
=========================== */

async function postComment(){

    const messageBox =
        document.getElementById("kissbook-message");

    const nameBox =
    document.getElementById("kissbook-name");

    const message = messageBox.value.trim();
    const customName = nameBox.value.trim();

    if(customName.length > 20){

    alert("Name must be under 20 characters.");
    return;

    }

    if(message === "") return;

    let username;
    let anonymous;

    if(customName !== ""){

        username = customName;
        anonymous = false;

    }else{

        const { count } = await window.supabase
            .from("kissbook")
            .select("*", { count: "exact", head: true })
            .eq("is_anonymous", true);

        username = `anon${count + 1}`;
        anonymous = true;

    }

    const { error } = await window.supabase
        .from("kissbook")
        .insert([
            {
                username: username,
                email: "",
                message: message,
                is_anonymous: anonymous
            }
        ]);

    if(error){

        console.error(error);
        return;

    }

    messageBox.value = "";
    nameBox.value = "";

    loadComments();

    }

/* ===========================
   INITIALIZE
=========================== */

document.getElementById("post-kiss").addEventListener("click", postComment);

loadComments();

window.playSong = playSong;
window.pauseSong = pauseSong;
window.volumeUp = volumeUp;
window.volumeDown = volumeDown;

/* ===========================
   RESPONSIVE  
=========================== */

window.addEventListener("DOMContentLoaded", () => {

    if(window.innerWidth <= 500){

        document.getElementById("home-btn").textContent = "⌂";
        document.getElementById("about-btn").textContent = "?";
        document.getElementById("songs-btn").textContent = "♪";
        document.getElementById("gallery-btn").textContent = "⛶";
        document.getElementById("portals-btn").textContent = "↗";

    }

});

const logo = document.getElementById("logo");

function toggleZine(){

    const activeLogo = document.body.classList.contains("zine")
    ? document.getElementById("zine-back")
    : logo;

    activeLogo.classList.remove("clicked");
    void activeLogo.offsetWidth;
    activeLogo.classList.add("clicked");

    if(document.body.classList.contains("zine")){

        zineOpenSound.currentTime = 0;
        zineOpenSound.play().catch(() => {});

    }else{

        zineCloseSound.currentTime = 0;
        zineCloseSound.play().catch(() => {});

    }

    document.body.classList.toggle("zine");

    const home = document.getElementById("home");
    const zine = document.getElementById("zine-home");

    if(document.body.classList.contains("zine")){

        home.style.display = "none";
        zine.style.display = "grid";

        logo.textContent = "neahZINE";

    }else{

        zine.style.display = "none";
        home.style.display = "block";

        logo.textContent = "neahWEB";

    }

    document.querySelectorAll(".window").forEach(window => {

        window.classList.remove("open");

    });

}

logo.addEventListener("click", toggleZine);

document
    .getElementById("zine-back")
    .addEventListener("click", toggleZine);