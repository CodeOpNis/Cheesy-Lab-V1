document.addEventListener("DOMContentLoaded", () => {
<<<<<<< HEAD

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
=======
    const gameScreen = document.getElementById("game-screen");
    const bakeScreen = document.getElementById("bake-screen");
    const bakeButton = document.getElementById("bake-button");

    const continueButton = document.getElementById("continue-button");

    const selectionStatus = document.getElementById("selection-status");

    const bakeOutput = document.getElementById("bake-output");

    const pizzaResult = document.getElementById("pizza-result");

    const pizzaDescription = document.getElementById("pizza-description");

    const badgeName = document.getElementById("badge-name");


    //Selection

    const selection = {

        base: null,

        sauce: null,

        cheese: null,

        toppings: [],

        seasoning: null

    };


    // Ingredient Selection

    const ingredientCards =
        document.querySelectorAll(".ingredient-card");


    ingredientCards.forEach(card => {

        card.addEventListener("click", () => {

            const category =
                card.dataset.category;

            const ingredient =
                card.dataset.ingredient;


            //Topping Multiple Selection

            if (category === "topping") {

                card.classList.toggle("selected");


                if (
                    selection.toppings.includes(ingredient)
                ) {

                    selection.toppings =
                        selection.toppings.filter(
                            item => item !== ingredient
                        );

                } else {

                    selection.toppings.push(ingredient);

                }

            }


            //Everything One Selection

            else {

                document
                    .querySelectorAll(
                        `.ingredient-card[data-category="${category}"]`
                    )
                    .forEach(otherCard => {

                        otherCard.classList.remove(
                            "selected"
                        );

                    });


                card.classList.add("selected");

                selection[category] =
                    ingredient;

            }


            updateSelectionStatus();

        });
>>>>>>> 5aa60c749f280986b88baae2c5541e321cd65a98

    });


<<<<<<< HEAD

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
=======
    //Update Selection

    function updateSelectionStatus() {

        const requiredSelected =
            selection.base &&
            selection.sauce &&
            selection.cheese &&
            selection.seasoning;


        if (!requiredSelected) {

            selectionStatus.textContent =
                "SYSTEM READY — SELECT ALL REQUIRED INGREDIENTS";
>>>>>>> 5aa60c749f280986b88baae2c5541e321cd65a98

            return;

        }

<<<<<<< HEAD
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
=======

        const toppingCount =
            selection.toppings.length;


        selectionStatus.textContent =
            `BUILD READY — ${toppingCount} TOPPING${toppingCount === 1 ? "" : "S"} SELECTED`;

    }


    //BAKE

    bakeButton.addEventListener("click", () => {

        if (!selection.base ||
            !selection.sauce ||
            !selection.cheese ||
            !selection.seasoning) {

            selectionStatus.textContent =
                "ERROR — REQUIRED INGREDIENTS MISSING";

            return;

        }


        startBake();

    });


    //Bake Terminal

    function startBake() {

        gameScreen.style.display = "none";

        bakeScreen.classList.add("active");

        bakeOutput.textContent = "";

        document
            .getElementById("result-panel")
            .classList.remove("active");


        const lines = [

            "> CHEESY OS OVEN CONTROL",

            ">",

            "> Reading ingredient matrix...",

            "> Checking dough integrity...",
>>>>>>> 5aa60c749f280986b88baae2c5541e321cd65a98

            "> Analyzing sauce composition...",

            "> Calculating cheese density...",

            "> Processing toppings...",

            "> Calibrating seasoning...",

<<<<<<< HEAD
            "",

            "> Initializing oven core...",

            "> Heating oven...",

            "> Baking pizza...",

            "",

            "> Running taste matrix..."
=======
            ">",

            "> Initializing oven...",

            "> Heating oven...",

            "> Baking pizza..."
>>>>>>> 5aa60c749f280986b88baae2c5541e321cd65a98

        ];


<<<<<<< HEAD
        let index = 0;
=======
        let lineIndex = 0;
>>>>>>> 5aa60c749f280986b88baae2c5541e321cd65a98


        function printNextLine() {

<<<<<<< HEAD
            if (
                index >=
                lines.length
            ) {

                finishBake();
=======
            if (lineIndex >= lines.length) {

                setTimeout(showResult, 700);

>>>>>>> 5aa60c749f280986b88baae2c5541e321cd65a98
                return;

            }

<<<<<<< HEAD
            bakeOutput.textContent +=
                lines[index] +
                "\n";

            index++;

            setTimeout(
                printNextLine,
                180
=======

            bakeOutput.textContent +=
                lines[lineIndex] + "\n";


            lineIndex++;


            setTimeout(
                printNextLine,
                250
>>>>>>> 5aa60c749f280986b88baae2c5541e321cd65a98
            );

        }

<<<<<<< HEAD
=======

>>>>>>> 5aa60c749f280986b88baae2c5541e321cd65a98
        printNextLine();

    }


<<<<<<< HEAD

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
=======
    //RESULT

    function showResult() {

        document
            .getElementById("bake-terminal")
            .style.display = "none";


        pizzaResult.textContent =
            "EXPERIMENT COMPLETE";


        pizzaDescription.textContent =
            "Your pizza has been successfully analyzed.";


        badgeName.textContent =
            "AWAITING GAME ENGINE";


        document
            .getElementById("result-panel")
            .classList.add("active");
>>>>>>> 5aa60c749f280986b88baae2c5541e321cd65a98

    }


<<<<<<< HEAD

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
=======
    //Return To Lab

    continueButton.addEventListener(
        "click",
        () => {

            document
                .getElementById("result-panel")
                .classList.remove("active");


            document
                .getElementById("bake-terminal")
                .style.display = "block";


            bakeScreen.classList.remove(
                "active"
            );


            gameScreen.style.display =
                "block";

        }
    );


    //PUBLIC GAME UI API

    window.cheesyLabUI = {

        getSelection() {

            return {

                base: selection.base,

                sauce: selection.sauce,

                cheese: selection.cheese,

                toppings: [
                    ...selection.toppings
                ],

                seasoning: selection.seasoning

            };

        },

        showResult({
            pizza = "UNKNOWN PIZZA",
            description = "",
            badge = "—"
        } = {}) {

            gameScreen.style.display =
                "none";

            bakeScreen.classList.add(
                "active"
            );

            document
                .getElementById("bake-terminal")
                .style.display = "none";


            pizzaResult.textContent =
                pizza;


            pizzaDescription.textContent =
                description;


            badgeName.textContent =
                badge;


            document
                .getElementById("result-panel")
                .classList.add("active");

        }

    };


    updateSelectionStatus();
>>>>>>> 5aa60c749f280986b88baae2c5541e321cd65a98

});