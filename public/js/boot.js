const terminal = document.getElementById("terminal");

const bootSequence = [
    {
        message: "CHEESY OS V1.0",
        speed: 50,
        pause: 5
    },
    {
        message: "Experimental Pizza Research....",
        speed: 50,
        pause: 5
    },
    {
        message: "Initializing Laboratory....",
        speed: 50,
        pause: 5
    }
];

// terminal.innerText = bootSequence[0].message;

    let i = 0;
    let output = "";

    let booting = setInterval(() => {
        output += bootSequence[1].message[i];
        terminal.innerHTML = output;
        i++;
        if(i >= bootSequence[1].message.length){
        clearInterval(booting);
    }
    }, 500);


