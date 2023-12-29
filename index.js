// set random background image on page load

const backgroundImages = ["woodsy.jpeg", "party.jpeg", "nautiloid.jpeg", "battle.jpeg", "space.jpeg"];
let currentBackground;
setBackground();

// function: set random background image

function setBackground() {
    const newBackground = backgroundImages[Math.floor(Math.random()*backgroundImages.length)]; // select random image name from images array 
    if (newBackground===currentBackground) { 
        setBackground(); // prevent the same image from being loaded twice
    } else {
        document.querySelector('body').style.backgroundImage = `url('images/${newBackground}`; // set new background image in CSS
        currentBackground = newBackground; // store name of current background under global variable currentBackground
    }
}

// event listener: change background picture on button click

const btn = document.querySelector('button');

btn.addEventListener("click", () => {
    // set new background
    setBackground();


});