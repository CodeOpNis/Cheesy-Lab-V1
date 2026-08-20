document.addEventListener("DOMContentLoaded", () => {

    const ingredientCards = document.querySelectorAll(".ingredient");
    const bakeButton = document.getElementById("bake-button");
    const selectionStatus = document.querySelector(".selection-status");
    const gameInterface = document.getElementById("game-interface");
    const resultView = document.getElementById("result-view");
    const bakeOutput = document.getElementById("bake-output");
    const resultType = document.getElementById("result-type");
    const pizzaResult = document.getElementById("pizza-result");
    const pizzaTitle = document.getElementById("pizza-title");
    const pizzaDescription = document.getElementById("pizza-description");
    const badgeName = document.getElementById("badge-name");
    const continueButton = document.getElementById("continue-button");

// SELECTION STATE

    const selection = {
        crust: null,
        sauce: null,
        cheese: null,
        toppings: [],
        seasoning: null
    };

// HELPER

    function updateStatus(
        title,
        message
    ) {

        const statusTitle = selectionStatus?.querySelector("span");


        const statusMessage = selectionStatus?.querySelector("small");

        if (statusTitle) {

            statusTitle.textContent = title;
        }

        if (statusMessage) {

            statusMessage.textContent = message;
        }

    }


// CHECK READY

    function isReady() {
        
        return (
            selection.crust &&
            selection.sauce &&
            selection.cheese &&
            selection.seasoning &&
            selection.toppings.length > 0
        );

    }


// UPDATE READY STATE

    function updateReadyState() {

        if (!bakeButton) return;

        bakeButton.disabled =
            !isReady();

        if (isReady()) {

            updateStatus(
                "BUILD READY",
                `${selection.toppings.length} TOPPING` +
                (
                    selection.toppings.length === 1
                        ? ""
                        : "S"
                ) +

                " SELECTED"
            );
        }

        else {
            updateStatus(
                "READY",
                "SELECT ALL REQUIRED INGREDIENTS"
            );
        }

    }


// INGREDIENTS CLICK

    ingredientCards.forEach(card => {

        card.addEventListener(
            "click",
            () => {

                const category = card.dataset.category;
                const id = card.dataset.id;
                const value = card.dataset.value;

                if (
                    !category ||
                    !id ||
                    !value
                ) {

                    console.warn(
                        "Ingredient card missing data:",
                        card
                    );

                    return;

                }

                // TOPPINGS (MUTIPLE ALLOWED)

                if (
                    category === "topping"
                ) {

                    const index = selection.toppings.indexOf(value);

                    if (index === -1) {

                        selection.toppings.push(value);
                        card.classList.add("selected");
                    }

                    else {

                        selection.toppings.splice(index, 1);
                        card.classList.remove("selected");
                    }

                }



                // NORMAL CATEGORY (ONE SELECTION)

                else {

                    ingredientCards.forEach(
                        otherCard => {

                            if (
                                otherCard.dataset.category ===
                                category
                            ) {

                                otherCard.classList.remove("selected");
                            }
                        }
                    );

                    card.classList.add("selected");

                    selection[category] = value;

                }

                updateReadyState();

            }
        );

    });



//   GET SELECTION

    function getSelection() {

        return {
            crust: selection.crust,
            sauce: selection.sauce,
            cheese: selection.cheese,
            toppings: [...selection.toppings],
            seasoning: selection.seasoning
        };

    }



// BAKE BUTTON

    if (bakeButton) {

        bakeButton.addEventListener(
            "click",
            () => {

                if (!isReady()) {

                    updateStatus(
                        "ERROR",
                        "REQUIRED INGREDIENTS MISSING"
                    );

                    return;
                }

                startBake();
            }
        );

    }

// BAKE SEQUENCE

    function startBake() {

        const engine = window.cheesyLabGame;

        if (
            !engine ||
            typeof engine.bake !== "function"
        ) {

            console.error("Cheesy Lab game engine not found.");

            updateStatus(
                "ERROR",
                "GAME ENGINE NOT LOADED"
            );

            return;

        }

        gameInterface.hidden = true;


        resultView.hidden = false;

        resultView.classList.remove("show-result");

        bakeOutput.textContent = "";

        const lines = [

            "CHEESY OS V1.0",

            "==============================",

            "",

            "> Reading ingredient matrix...",

            "> Checking crust integrity...",

            "> Analyzing sauce composition...",

            "> Calculating cheese density...",

            "> Processing toppings...",

            "> Calibrating seasoning...",

            "",

            "> Initializing oven core...",

            "> Heating oven...",

            "> Baking pizza...",

            "",

            "> Running taste matrix..."

        ];


        let index = 0;


        function printNextLine() {

            if (
                index >=
                lines.length
            ) {

                finishBake();
                return;

            }

            bakeOutput.textContent +=
                lines[index] +
                "\n";

            index++;

            setTimeout(
                printNextLine,
                180
            );

        }

        printNextLine();

    }



    //FINISH BAKE

    function finishBake() {

        setTimeout(
            () => {

                const result =
                    window.cheesyLabGame.bake( getSelection());

                if (!result.success) {

                    showEngineError(
                        result.error
                    );

                    return;
                }

                displayResult( result);

            },

            500
        );

    }



// DISPLAY RESULT

    function displayResult(result){

        const pizza = result.pizza;

        const badge = result.badge;

        bakeOutput.textContent +=
            "\n\n" +
            "> ANALYSIS COMPLETE" +
            "\n" +
            "> RESULT DETECTED" +
            "\n\n";


        setTimeout(
            () => {

                resultType.textContent = `TYPE: ${pizza.type}`;
                pizzaResult.textContent = pizza.name;
                pizzaTitle.textContent = pizza.title;
                pizzaDescription.textContent = pizza.description;
                badgeName.textContent = badge ? badge.name : "—";
                resultView.classList.add("show-result");
            },

            400
        );

    }



// ENGINE ERROR

    function showEngineError(
        message
    ) {

        bakeOutput.textContent +=
            "\n\n" +
            "> ERROR" +
            "\n" +
            `> ${message}`;


        setTimeout(
            () => {

                gameInterface.hidden = false;
                resultView.hidden = true;
                updateReadyState();
            },

            1800
        );

    }



// RETURN TO LAB

    if (continueButton) {

        continueButton.addEventListener(
            "click",
            () => {

                resultView.hidden = true;
                resultView.classList.remove("show-result");
                gameInterface.hidden = false;
                clearSelection();
                updateReadyState();
            }
        );

    }


// CLEAR SELECTION

    function clearSelection() {

        selection.crust = null;

        selection.sauce = null;

        selection.cheese = null;

        selection.seasoning = null;

        selection.toppings = [];

        ingredientCards.forEach(
            card => {

                card.classList.remove(
                    "selected"
                );

            }
        );

    }


//  PUBLIC UI API

    window.cheesyLabUI = {

        getSelection,
        clearSelection,
        isReady
    };

// INITIALIZE

    updateReadyState();

});