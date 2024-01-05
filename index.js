//* GLOBAL VARIABLES *//

const copy = document.getElementById("copy");
const carousel = document.getElementById("carousel");
const btn = document.querySelector('button');

let currentBackground;
const backgroundImages = ["woodsy.jpeg", "party.jpeg", "nautiloid.jpeg", "battle.jpeg", "space.jpeg"];

const generatedCharacters = [];


//** EVENT LISTENERS **/

/* page load: set random background */
window.addEventListener("load", setBackground);

/* button click: reset background and load party (this will later be changed so that "click" calls the setParty function, and background will change after data fetches) */
btn.addEventListener("click", async() => {
    setBackground();
    createCard(await generateCharacter());
});


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
            randomCharacter.class.archetype.description = data.results[x].archetypes[y].desc;
        }),

        // background
        fetch(`https://api.open5e.com/backgrounds`)
            .then((response) => response.json())
            .then((data) => {
            const x = randomElement(data.results);
            randomCharacter.background.name = data.results[x].name;
            randomCharacter.background.description = data.results[x].desc;
            randomCharacter.background.proficiencies = data.results[x].skill_proficiencies;
        })
    ])

    // return randomCharacter
    return randomCharacter;
}


/* create card and append it to carousel */

function createCard(character) {
    const card = document.createElement('li');
    card.className = 'card';

    const characterRace = document.createElement('h3');
    const characterClass = document.createElement('h2');
    const classArchetype = document.createElement('h3');
    const archetypeDescription = document.createElement('p');

    characterRace.id = 'race';
    characterClass.id = 'class';
    classArchetype.id = 'archetype';
    //archetypeDescription.id = 'archetype-description';

    characterRace.innerText = character.race.name;
    characterClass.innerText = character.class.name;
    classArchetype.innerText = character.class.archetype.name;
    //archetypeDescription.innerText = character.class.archetype.description;

    card.append(characterRace);
    card.append(characterClass);
    card.append(classArchetype);
    //card.append(archetypeDescription);

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