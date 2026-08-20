// TRANSITION SYSTEM

const TRANSITION_KEY = "CheesyLabEntering";

// BOOT PAGE

function goToLab(){

    if(window.__labTransitionStarted){
        return;
    }

    window.__labTransitionStarted = true;

    sessionStorage.setItem(
        TRANSITION_KEY,
        "true"
    );

    const bootScreen = document.getElementById("boot-screen");

    if(!bootScreen){
        
        window.location.href = "/lab";
        return;
    }

    bootScreen.classList.add(
        "leaving"
    );

    // Waiting fade to finish

    setTimeout(() => {
        window.location.href = "/lab";
    }, 650);
}

// LAB PAGE

function initializeLabTransition() {

    const enteredFromBoot = sessionStorage.getItem(TRANSITION_KEY);

    if(enteredFromBoot !== "true"){

        return;
    }

    sessionStorage.removeItem(TRANSITION_KEY);

    //Black Overlay

    const overlay = document.createElement("div");

    overlay.id = "lab-transition-overlay";

    document.body.appendChild(overlay);

    //Transition

    const scene = document.querySelector(".scene");

    if(scene){

        scene.style.opacity = "0";

        scene.style.transform = "scale(1.025)";

        scene.style.transition = [

            "opacity 0.6s ease",
            "transform 0.8s ease"
        ].join(", ");
    }

    requestAnimationFrame(() => {

        requestAnimationFrame(() => {
            
            overlay.classList.add("fade-out");
        
            if(scene){

                scene.style.opacity = "1";
                scene.style.transform = "scale(1)";
            }

        });

    });

    //Remove Overlay

    setTimeout(() => {

        overlay.remove();
        if(scene){

            scene.style.transition = "";
        }
    }, 900);
}


// INITIALIZING

document.addEventListener("DOMContentLoaded", () => {

    window.goToLab = goToLab;

    if(window.location.pathname === "/lab"){
        initializeLabTransition();
    }
});