document.addEventListener("DOMContentLoaded", () => {
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

    });


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

            return;

        }


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

            "> Analyzing sauce composition...",

            "> Calculating cheese density...",

            "> Processing toppings...",

            "> Calibrating seasoning...",

            ">",

            "> Initializing oven...",

            "> Heating oven...",

            "> Baking pizza..."

        ];


        let lineIndex = 0;


        function printNextLine() {

            if (lineIndex >= lines.length) {

                setTimeout(showResult, 700);

                return;

            }


            bakeOutput.textContent +=
                lines[lineIndex] + "\n";


            lineIndex++;


            setTimeout(
                printNextLine,
                250
            );

        }


        printNextLine();

    }


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

    }


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

});