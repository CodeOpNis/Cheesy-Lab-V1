const form = document.getElementById("ingredients-list");
const result = document.getElementById("result");

// let vegCount = 0;
// let meatCount = 0;
// let earthyCount = 0;
// let spicyCount = 0;
// let chaosCount = 0;
// let balancedCount = 0;
// let cheesyCount = 0;

//PIZZA ORDER HANDLER

form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get selected options
    const sizeInput = document.querySelector('input[name="size"]:checked');
    const crust = document.querySelector('input[name="crust"]:checked');
    const cheese = document.querySelector('input[name="cheese"]:checked');
    const seasoning = document.querySelector('input[name="seasoning"]:checked');
    const sauce = document.querySelector('input[name="sauce"]:checked');

    // Get all selected choice driven multiple toppings
    const toppingChoices = document.querySelectorAll(".topping");
    const toppings = [];

    toppingChoices.forEach((checkbox) => {
        if (checkbox.checked) {
            toppings.push(checkbox.value);
        }
    });

    // Validation
    if (!sizeInput) {
        result.textContent = "Please select a size.";
        return;
    }

    if (!crust) {
        result.textContent = "Please select a crust.";
        return;
    }

    if (!sauce) {
        result.textContent = "Please select a sauce.";
        return;
    }

    if (toppings.length === 0) {
        result.textContent = "Please select at least one topping.";
        return;
    }

    // if (!cheese && !seasoning) { pizzaText = You ordered a ${sizeInput.value} pizza with ${crust.value} crust; } else if (!cheese && seasoning) { pizzaText = You ordered a ${sizeInput.value} pizza with ${crust.value} crust, seasoned with ${seasoning.value}; } else if (cheese && !seasoning) { pizzaText = You ordered a ${sizeInput.value} pizza with ${crust.value} crust and ${cheese.value} cheese; } else { pizzaText = You ordered a ${sizeInput.value} pizza with ${crust.value} crust and ${cheese.value} cheese, seasoned with ${seasoning.value}; }

    // CREATE PIZZA OBJECT
    const pizza = {
        size: sizeInput.value,
        crust: crust.value,
        sauce: sauce.value,
        cheese: cheese ? cheese.value : null,
        seasoning: seasoning ? seasoning.value : null,
        toppings: toppings
    };

    // Build result dialogue
    let pizzaText = `You ordered a ${pizza.size} pizza with ${pizza.crust} crust`;

    if (pizza.cheese) {
        pizzaText += ` and ${pizza.cheese} cheese`;
    }

    if (pizza.seasoning) {
        pizzaText += ` seasoned with ${pizza.seasoning}`;
    }

    pizzaText += ` with ${pizza.sauce} sauce and toppings: ${pizza.toppings.join(", ")}`;

    // Display result
    result.innerHTML = `
        <h3>Your Pizza</h3>
        <p>${pizzaText}</p>
    `;

    console.log(pizza);
    console.log(form);
    
    //Bake Pizza

    // console.log(allToppings.value);
    // console.log(allToppings.getAttribute("data-tag"));
});