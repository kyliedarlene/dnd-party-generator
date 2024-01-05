//* GLOBAL VARIABLES *//

const copy = document.getElementById("copy");
const carousel = document.getElementById("carousel");
const party = document.getElementById('party');
const btn = document.querySelector('button');

let currentBackground;
const backgroundImages = ["woodsy.jpeg", "party.jpeg", "nautiloid.jpeg", "battle.jpeg", "space.jpeg"];

const generatedCharacters = [];


//** EVENT LISTENERS **/

/* page load: set random background */
window.addEventListener('load', setBackground);

/* button click: reset background and load character card */
btn.addEventListener('click', async() => {
    setBackground();
    createCard(await generateCharacter());
});

/* button mousover: shiny mouseover effect */
btn.addEventListener('mouseover', () => {
    shinyEffect();
}) 


//** FUNCTIONS **//

/* set random background image */

function setBackground() {
    const x = randomElement(backgroundImages);
    const newBackground = backgroundImages[x]; // select random image name from images array 
    if (newBackground===currentBackground) { 
        setBackground(); // prevent the same image from being loaded twice
    } else {
        document.querySelector('body').style.backgroundImage = `url('images/backgrounds/${newBackground}`; // set new background image in CSS
        currentBackground = newBackground; // store name of current background under global variable currentBackground
    }
}

function shinyEffect() {
    btn.style.backgroundPosition = 'left center';
    btn.style.transition = 'background-position 2000ms ease-out'
}

/* retrieve random character data and return character object */

async function generateCharacter() {
    // initialize randomCharacter object
    const randomCharacter = {
        race: {},
        class: {
            archetype: {}, 
        },
        background: {},
    };

    // fetch and add character attributes to randomCharacter
    await Promise.all([    
        // race
        fetch(`https://api.open5e.com/races`)
            .then((response) => response.json())
            .then((data) => {
            const x = randomElement(data.results);
            randomCharacter.race.name = data.results[x].name;
        }),
        // class
        fetch(`https://api.open5e.com/classes`)
            .then((response) => response.json())
            .then((data) => {
            const x = randomElement(data.results);
            randomCharacter.class.name = data.results[x].name;

            // archetype
            const y = randomElement(data.results[x].archetypes);
            randomCharacter.class.archetype.name = data.results[x].archetypes[y].name;
            randomCharacter.class.archetype.description = data.results[x].archetypes[y].desc.split('#', 1)[0];
        }),

        // background
        fetch(`https://api.open5e.com/backgrounds`)
            .then((response) => response.json())
            .then((data) => {
            const x = randomElement(data.results);
            randomCharacter.background.name = data.results[x].name;
            randomCharacter.background.description = data.results[x].desc.split('*', 1)[0];
            randomCharacter.background.proficiencies = data.results[x].skill_proficiencies;
        })
    ])

    // return randomCharacter
    return randomCharacter;
}


/* create card and append it to carousel */

function createCard(character) {
    party.style.display = 'flex';
    copy.style.display = 'none';
    btn.style.display = 'none';
    
    const card = document.createElement('li');
    card.className = 'card';

    const characterRace = document.createElement('h3');
    const characterClass = document.createElement('h3');
    const classArchetype = document.createElement('h4');
    const archetypeDescription = document.createElement('p');
    const characterBackground = document.createElement('h3');
    const backgroundProficiencies = document.createElement('h4');
    const backgroundDescription = document.createElement('p');

    characterRace.id = 'race';
    characterClass.id = 'class';
    classArchetype.id = 'archetype';
    archetypeDescription.id = 'archetype-description';
    characterBackground.id = 'background';
    backgroundProficiencies.id = 'proficiencies';
    backgroundDescription.id = 'background-description';

    characterRace.innerText = `Race: ${character.race.name}`;
    characterClass.innerText = `Class: ${character.class.name}`;
    classArchetype.innerText = `Archetype: ${character.class.archetype.name}`;
    archetypeDescription.innerText = character.class.archetype.description;
    characterBackground.innerText = `Background: ${character.background.name}`;
    if (character.background.proficiencies !== null) {
        backgroundProficiencies.innerText = `Proficiencies: ${character.background.proficiencies}`;
    } else {
        backgroundProficiencies.innerText = `Proficiencies: N/A`;
    }
    backgroundDescription.innerText = character.background.description;

    card.append(characterRace);
    card.append(characterClass);
    card.append(classArchetype);
    card.append(archetypeDescription);
    card.append(characterBackground);
    card.append(backgroundProficiencies);
    card.append(backgroundDescription);

    carousel.append(card);
}

/* return a randomly selected array index */

function randomElement(array) {
    return Math.floor(Math.random() * array.length);
}


// PREVIOUS CODE
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