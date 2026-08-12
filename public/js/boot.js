const terminal = document.getElementById("terminal");

const bootSequence = [
    {
        message: "CHEESY OS V1.0",
        speed: 70, 
        pause: 500
    },
    {
        message: "Experimental Pizza Research Division",
        speed: 50,
        pause: 5
    },
    {
        message: "Initialising Laboratory....",
        speed: 40,
        pause: 700
    },
    {
        message: "Mounting Ingredient Database........OK",
        speed: 12,
        pause: 120
    },
    {
        message: "Restocking Fresh Ingredients.........OK",
        speed: 12,
        pause: 120
    },
    {
        message: "Stabilizing Oven Core...................OK",
        speed: 12,
        pause: 120
    },
    {
        message: "Loading Badge Registry.............OK",
        speed: 12,
        pause: 120
    },
    {
        message: "Calibrating Taste Matrix............OK",
        speed: 12,
        pause: 120
    },
    {
        message: "Loading Pixel Assets...........OK",
        speed: 12,
        pause: 120
    },
    {
        message: "Authenticating Researcher...............SUCCESS",
        speed: 12,
        pause: 120
    },
    {
        message: "",
        speed: 0,
        pause: 300,
    },
    {
        message: "Entering Cheesy Lab.....",
        speed: 55,
        pause: 1500
    },
    {
        message: "",
        speed: 0,
        pause: 10
    },
    {
        message: "Welcome Researcher!",
        speed: 55,
        pause: 1500
    }
]

let currentMessage = 0; 
let currentCharacter = 0; 
let output = "";

// const booting = setInterval(() => { // if (currentMessage >= bootSequence.length){ // clearInterval(booting); // return; // } // const message = bootSequence[currentMessage].message; // if (currentCharacter >= message.length){ // output += "\n"; // currentMessage++; // currentCharacter = 0; // return; // } // output += message[currentCharacter]; // terminal.textContent = output; // currentCharacter++; // }, 50);

function typeCharacter(){
    if(currentMessage >= bootSequence.length){
        revealCRT();
        return;
    }

const current = bootSequence[currentMessage];

if(currentCharacter >= current.message.length){
    output += "\n";
    terminal.textContent = output;
    currentMessage++;
    currentCharacter = 0;
    setTimeout(typeCharacter, current.pause);
    return;
}

    output += current.message[currentCharacter];
    terminal.textContent = output;

    currentCharacter++;

    setTimeout(typeCharacter, current.speed);
}

function revealCRT(){
    
}

typeCharacter();