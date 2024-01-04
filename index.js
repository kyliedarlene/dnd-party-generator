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
// TESTING: CODE REFACTOR

//createCard() adds card to DOM
const cardContainer = document.getElementById('card-container');

function createCard() {
    const card = document.createElement('div');
    card.id = 'card';
    card.class = 'card';
    cardContainer.append(card);

    const characterRace = document.createElement('h3');
    const characterClass = document.createElement('h2');
    const classArchetype = document.createElement('h3');
    const archetypeDescription = document.createAttribute('p');

    characterRace.id = 'race';
    characterClass.id = 'class';
    classArchetype.id = 'archetype';
    //archetypeDescription.id = 'archetype-description';

    characterRace.innerText = "Drow";
    characterClass.innerText = "Druid";
    classArchetype.innerText = "Circle of the Land";
    //archetypeDescription.innerText = "The Circle of the Land is made up of mystics and sages who safeguard ancient knowledge and rites through a vast oral tradition. These druids meet within sacred circles of trees or standing stones to whisper primal secrets in Druidic. The circle's wisest members preside as the chief priests of communities that hold to the Old Faith and serve as advisors to the rulers of those folk. As a member of this circle, your magic is influenced by the land where you were initiated into the circle's mysterious rites."

    card.append(characterRace);
    card.append(characterClass);
    card.append(classArchetype);
    //card.appendChild(archetypeDescription);
}

createCard();

// uses fetch to retrieve random character data and then save in object; this will be passed to the create card function
// returns character object

function generateCharacter() {
    let randomCharacter = {
        race: {},
        class: {
            archetype: {}, 
        },
        background: {},
    };
    
    // race
    fetch(`https://api.open5e.com/races`)
        .then((response) => response.json())
        .then((data) => {
        const x = randomElement(data.results);
        randomCharacter.race.name = data.results[x].name;
        randomCharacter.race.description = data.results[x].desc;
        //console.log(randomCharacter);
    })

    // class
    fetch(`https://api.open5e.com/classes`)
        .then((response) => response.json())
        .then((data) => {
        const x = randomElement(data.results);
        randomCharacter.class.name = data.results[x].name;
        randomCharacter.class.description = data.results[x].desc;
        //console.log(randomCharacter);

        // archetype
        const y = randomElement(data.results[x].archetypes);
        //console.log(data.results[x].archetypes[y].name)
        randomCharacter.class.archetype.name = data.results[x].archetypes[y].name;
        randomCharacter.class.archetype.description = data.results[x].archetypes[y].desc;
        //console.log(randomCharacter)

    })

    // background
    fetch(`https://api.open5e.com/backgrounds`)
        .then((response) => response.json())
        .then((data) => {
        const x = randomElement(data.results);
        randomCharacter.background.name = data.results[x].name;
        randomCharacter.background.description = data.results[x].desc;
        randomCharacter.background.proficiencies = data.results[x].skill_proficiencies;
    })

    return randomCharacter;
}

console.log(generateCharacter());


function randomElement(array) {
    return Math.floor(Math.random() * array.length);
}

// OLD CODE: testing refactored code
// function createCard() {
//     const card = document.createElement('div');
//     card.id = 'card';
//     card.Container.append(card);
    
//     const characterRace = document.createElement('h3');
//     const characterClass = document.createElement('h2');
//     const classArchetype = document.createElement('h3');
//     const archetypeDescription = document.createAttribute('p');

//     characterRace.id = 'race';
//     characterClass.id = 'class';
//     classArchetype.id = 'archetype';
//     archetypeDescription.id = 'archetype-description';

//     characterRace.innerText = "Drow";
//     characterClass.innerText = "Druid";
//     classArchetype.innerText = "Circle of the Land";
//     archetypeDescription.innerText = "The Circle of the Land is made up of mystics and sages who safeguard ancient knowledge and rites through a vast oral tradition. These druids meet within sacred circles of trees or standing stones to whisper primal secrets in Druidic. The circle's wisest members preside as the chief priests of communities that hold to the Old Faith and serve as advisors to the rulers of those folk. As a member of this circle, your magic is influenced by the land where you were initiated into the circle's mysterious rites."

// }

// createCard();


// /* create and append character cards to carousel */

// function generateParty() {              // after form is built out, this will take an array of player names as an argument
//     // clear previously-generated cards
//     const previousCharacters = carousel.querySelectorAll("li");
//     previousCharacters.forEach((currentValue) => {
//         carousel.removeChild(currentValue);
//     })
    
//     // update body and button copy
//     copy.innerText = "Meet your adventure party!";
//     btn.innerText = "Make New Party";

//     for (let i = 1; i <= 5; i++) {      // when this takes an array of player names as an argument, this will be changed to a forEach() loop
//         // create card
//         const card = document.createElement("li");
//         card.className = "card";

//         // add character attributes to card
//         const characterRace = document.createElement("h3");
//         const characterClass = document.createElement("h3");
//         const characterBackground = document.createElement("h3");

//         // fetch attributes and append to card
//         setAttribute(card, characterRace, "races");
//         setAttribute(card, characterClass, "classes");
//         setAttribute(card, characterBackground, "backgrounds");

//         // set class icon
        

//         // append card to carousel
//         carousel.append(card);
//     }
// }

// /* Fetch attribute and append to card */

// function setAttribute(card, cardItem, attribute) {
//     fetch(`https://api.open5e.com/${attribute}`)
//         .then((response) => response.json())
//         .then((data) => {
//             const x = Math.floor(Math.random() * data.count);
//             //console.log(data.results[x])
//             cardItem.innerText = data.results[x].name;
//             cardItem.class = attribute;
//             card.append(cardItem);
//     })
// }

//** EVENT LISTENERS **/

/* page load: set random background */
window.addEventListener("load", setBackground);

/* button click: reset background and load party (this will later be changed so that "click" calls the setParty function, and background will change after data fetches) */
btn.addEventListener("click", () => {
    setBackground();
    //generateParty();
});