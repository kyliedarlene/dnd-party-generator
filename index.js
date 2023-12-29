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
    addPartyHTML();
});


// fetch and add attribute on DOM
function fetchAttribute(attribute) {
    fetch(`https://api.open5e.com/${attribute}`)
        .then((response) => response.json())
        .then((data) => {
            const x = Math.floor(Math.random() * data.count);
            // console.log("length: " + data.count);
            // console.log("random number: " + x);
            // console.log(data.results[x]);
            const newAttribute = document.getElementById(attribute);
            newAttribute.innerText = data.results[x].name;
    })
}

// first stab at filling in card on DOM

function generateCard() {
    fetchAttribute("races");
    fetchAttribute("classes");
    fetchAttribute("backgrounds");

    // add set icon switch
}

btn.addEventListener("click", generateCard);


const partyHTML = document.getElementById("party");
const copy = document.getElementById("copy");

// I think this will have to be changed to be added by DOM but hard coding first
function addPartyHTML() {
    if(partyHTML.hasAttribute("hidden")) {
    partyHTML.removeAttribute("hidden");
    copy.innerText = "Meet your adventure party!";
    btn.innerText = "Make New Party";
    }
} 



/******
 * 
 * PSEUDOCODE
 * 
 * When the button is clicked:
 * 
 *** setBackground()
 * 
 *** displayGeneratedParty()
 * 
 * 
 * const party = generateParty()
 * forEach element of party {
 *      displayCard();                         /////
 * }
 * 
 * generateParty() create Party Object + fill with Character Objects
 *      declare party
 *      x 6: addCharacter()
 *      return party
 * 
 * addCharacter() add Character Object to Party Object          // maybe could be condensed into generateParty()?
 *      add makeCharacter()
 *      Name: Character1            // how to make it automatically character #?
 * 
 * makeCharacter() make and return Character object
 *      Race: fetchStat()
 *      Class: fetchStat()
 *      Alignment: fetchStat()
 */



 /*
 * 
 * fetchAttribute()
 *      
 * 
 * 
 * 
 */

// const url = "https://www.dnd5eapi.co/docs/#get-/api/";

// function fetchAttribute(attribute) {
//     fetch(`url/${attribute}/elf`)
//         .then((response) => response.json())
//         .then(() => console.log(response))
//  }

//  fetchAttribute("race");