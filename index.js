// set random background image on page load

const backgroundImages = ["woodsy.jpeg", "party.jpeg", "nautiloid.jpeg", "battle.jpeg", "space.jpeg"];
let currentBackground;
setBackground();

// function: set random background image

function setBackground() {
    const newBackground = backgroundImages[Math.floor(Math.random()*backgroundImages.length)]; // select random image from images array 
    if (newBackground===currentBackground) { 
        setBackground(); // prevent the same image from being loaded twice
    } else {
        document.querySelector('body').style.backgroundImage = `url('images/${newBackground}`; // set new background image in CSS
        currentBackground = newBackground;  // store name of current background under global variable currentBackground
    }
}

// event listener: change background picture on button click

const btn = document.querySelector('button');

btn.addEventListener("click", () => {
    // set new background
    setBackground();
});





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