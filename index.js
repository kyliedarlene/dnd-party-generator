/* declare global variables */

const copy = document.getElementById("copy");
const carousel = document.getElementById("carousel");
const btn = document.querySelector('button');

let currentBackground;
const backgroundImages = ["woodsy.jpeg", "party.jpeg", "nautiloid.jpeg", "battle.jpeg", "space.jpeg"];


/** FUNCTIONS **/

/* set random background image */

function setBackground() {
    const newBackground = backgroundImages[Math.floor(Math.random()*backgroundImages.length)]; // select random image name from images array 
    if (newBackground===currentBackground) { 
        setBackground(); // prevent the same image from being loaded twice
    } else {
        document.querySelector('body').style.backgroundImage = `url('images/backgrounds/${newBackground}`; // set new background image in CSS
        currentBackground = newBackground; // store name of current background under global variable currentBackground
    }
}

/* create and append character cards to carousel */

function generateParty() {              // after form is built out, this will take an array of player names as an argument
    // clear previously-generated cards
    const previousCharacters = carousel.querySelectorAll("li");
    previousCharacters.forEach((currentValue) => {
        carousel.removeChild(currentValue);
    })
    
    // update body and button copy
    copy.innerText = "Meet your adventure party!";
    btn.innerText = "Make New Party";

    for (let i = 1; i <= 5; i++) {      // when this takes an array of player names as an argument, this will be changed to a forEach() loop
        // create card
        const card = document.createElement("li");
        card.className = "card";

        // add character attributes to card
        const characterRace = document.createElement("h3");
        const characterClass = document.createElement("h3");
        const characterBackground = document.createElement("h3");

        // fetch attributes and append to card
        setAttribute(card, characterRace, "races");
        setAttribute(card, characterClass, "classes");
        setAttribute(card, characterBackground, "backgrounds");

        // set class icon
        

        // append card to carousel
        carousel.append(card);
    }
}

/* Fetch attribute and append to card */

function setAttribute(card, cardItem, attribute) {
    fetch(`https://api.open5e.com/${attribute}`)
        .then((response) => response.json())
        .then((data) => {
            const x = Math.floor(Math.random() * data.count);
            console.log(data.results[x])
            cardItem.innerText = data.results[x].name;
            cardItem.class = attribute;
            card.append(cardItem);
    })
}

//** EVENT LISTENERS **/

/* page load: set random background */
window.addEventListener("load", setBackground);

/* button click: reset background and load party (this will later be changed so that "click" calls the setParty function, and background will change after data fetches) */
btn.addEventListener("click", () => {
    setBackground();
    generateParty();
});


// TEST NOTE