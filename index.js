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
        document.querySelector('body').style.backgroundImage = `url('images/backgrounds/${newBackground}`; // set new background image in CSS
        currentBackground = newBackground; // store name of current background under global variable currentBackground
    }
}

// event listener: change background picture on button click

const btn = document.querySelector('button');

// this will later be changed so that "click" calls the setParty function, and background will change after data fetches
btn.addEventListener("click", () => {
    setBackground();
    generateParty();
});



// first stab at filling in card on DOM

function generateCard() {
    fetchAttribute("races");
    fetchAttribute("classes");
    fetchAttribute("backgrounds");

    // add set icon switch
}

function generateCardCarousel() {
    const carousel = document.getElementById('carousel');
    console.log(carousel);
    const race = document.createElement('li');
    race.textContent = "it works";
    console.log("race: " + race);
    carousel.append(race);
}

// generateCardCarousel();

btn.addEventListener("click", generateCard);


//const partyHTML = document.getElementById("party");
//const copy = document.getElementById("copy");

// I think this will have to be changed to be added by DOM but hard coding first
function addPartyHTML() {
    if(partyHTML.hasAttribute("hidden")) {
    partyHTML.removeAttribute("hidden");
    copy.innerText = "Meet your adventure party!";
    btn.innerText = "Make New Party";
    }
} 

const party = document.getElementById("carousel");

function generateParty() {
    for (let i = 1; i <= 6; i++) {
        // create card
        const card = document.createElement("li");
        card.className = "card";
        card.id = `character-${i}`;

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
        party.append(card);
    }
}

function setAttribute(card, cardItem, attribute, subAttribute) {
    fetch(`https://api.open5e.com/${attribute}`)
        .then((response) => response.json())
        .then((data) => {
            const x = Math.floor(Math.random() * data.count);
            cardItem.innerText = data.results[x].name;
            card.append(cardItem);
    })
}