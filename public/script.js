const form = document.getElementById("ingredients-list");
const result = document.getElementById("result");
const baked = document.getElementById("pizza-ready");

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

    const scores = {
    spicy: 0,
    meat: 0,
    veg: 0,
    rich: 0,
    balanced: 0,
    chaos: 0,
    earthy: 0,
    cheesy: 0,
    smoky: 0
}

    // Get selected options
    const sizeInput = document.querySelector('input[name="size"]:checked');
    const crust = document.querySelector('input[name="crust"]:checked');
    const cheese = document.querySelector('input[name="cheese"]:checked');
    const seasoning = document.querySelector('input[name="seasoning"]:checked');
    const sauce = document.querySelector('input[name="sauce"]:checked');

    // Get all selected choice driven multiple toppings
    const toppingChoices = document.querySelectorAll(".topping");
    const toppings = [];
    const traits = [];

    form.querySelectorAll(".recipe-item").forEach((checkbox) => {
    if (checkbox.checked) {
        traits.push(checkbox.getAttribute("data-tag"));
        }
    });

    toppingChoices.forEach((checkbox) => {
        if (checkbox.checked) {
            toppings.push(checkbox.value);
        }
    });

    //TRAITS CALCULATOR
    traits.forEach(trait => {
        scores[trait]++;
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

    // console.log(pizza);
    // console.log(traits);
    // console.log(scores);    
    
    //PIZZA TYPE CALCULATOR
    let highest = 0;
    let secondHighest = 0;

    let dominantTrait = "";
    let secondTrait = "";

    for (const trait in scores) {
    console.log("\nChecking:", trait);
    console.log("Score:", scores[trait]);
    console.log("Current Highest:", highest);
    console.log("Current Second Highest:", secondHighest);
    const score = scores[trait];
    if (score > highest) {

        secondHighest = highest;
        secondTrait = dominantTrait;

        highest = score;
        dominantTrait = trait;

        console.log("➡ New Highest Found");
        console.log("Highest:", dominantTrait, highest);
        console.log("Second:", secondTrait, secondHighest); 
    }

    else if (score > secondHighest) {

        secondHighest = score;
        secondTrait = trait;

        console.log("➡ New Second Highest Found");
        console.log("Second:", secondTrait, secondHighest);

    }

}

    //PIZZA PERSONALITY 

    const pizzaTypes = {
        meat: {
            type: "Basic",
            name: "Meat Pizza",
            description: "meat.",
            Badge: "meat.",
            Title: "meat."
        },
        veg: {
            type: "Basic",
            name: "Veg Pizza",
            description: "veg.",
            Badge: "veg",
            Title: "veg"
        },
        cheesy: {
            type: "Basic",
            name: "Cheese Pizza",
            description: "cheese.",
            Badge: "cheese",
            Title: "cheese"
        },
        rich: {
            type: "Basic",
            name: "Rich Pizza",
            description: "rich.",
            Badge: "rich",
            Title: "rich"
        },
        balanced: {
            type: "Basic",
            name: "Balanced Pizza",
            description: "balanced.",
            Badge: "balanced",
            Title: "balanced"
        },
        smoky: {
            type: "Basic",
            name: "Smoky Pizza",
            description: "smoky.",
            Badge: "smoky",
            Title: "smoky"
        },
        earthy: {
            type: "Basic",
            name: "Earthy Pizza",
            description: "earthy.'",
            Badge: "earthy",
            Title: "earthy"
        },
        spicy: {
            type: "Basic",
            name: "Spicy Pizza",
            description: "spicy.",
            Badge: "spicy",
            Title: "spicy"
        },
        chaos: {
            type: "Basic",
            name: "Chaos Pizza",
            description: "chaos.",
            Badge: "chaos",
            Title: "chaos"
        },
        mystery: {
            type: "Custom",
            name: "Mystery Pizza",
            description: "mystery.",
            Badge: "mystery",
            Title: "mystery"
        }
    }

    //HYBRID PIZZA PERSONALITY 

    const hybridPizzaTypes = {
        "meat-spicy": {
            type: "Hybrid",
            name: "Meat Spicy Pizza",
            description: "a delicious blend of meat and spice.",
            Badge: "meat-spicy",
            Title: "Meat Spicy"
        },
        "veg-earthy": {
            type: "Hybrid",
            name: "Veg Earthy Pizza",
            description: "a delicious blend of vegetables and earthy flavors.",
            Badge: "veg-earthy",
            Title: "Veg Earthy"
        },
        "cheesy-rich": {
            type: "Hybrid",
            name: "Cheesy Rich Pizza",  
    }

    //Build Baked Pizza Dialogue
    
    const bakedPizza = pizzaTypes[dominantTrait] || pizzaTypes["mystery"];

    //BAKE PIZZA

    baked.innerHTML = `
    <h3>Your Pizza Type</h3>
    <p>You got a <b>${bakedPizza.name}</b>! <br/> Description: ${bakedPizza.description}</p> <br/> Badge: ${bakedPizza.Badge} <br/> Title: ${bakedPizza.Title}`;

});




