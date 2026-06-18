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

    //Build Baked Pizza Dialogue
    
    let pizzaBaked = ` `;

    //BAKE PIZZA

    // if(dominantTrait == "meat"){
    //     baked.innerHTML = `You baked a ${pizzaTypes.meat.name} pizza &nbsp; Type: ${pizzaTypes.meat.type} &nbsp;  Description: ${pizzaTypes.meat.description} &nbsp; Badge: ${pizzaTypes.meat.Badge}`;
    // }else if(dominantTrait == "veg"){
    //     baked.innerHTML = `You baked a ${pizzaTypes.veg.name} pizza &nbsp; Type: ${pizzaTypes.veg.type} &nbsp;  Description: ${pizzaTypes.veg.description} &nbsp; Badge: ${pizzaTypes.veg.Badge}`;
    // }else if(dominantTrait == "cheesy"){
    //     baked.innerHTML = `You baked a ${pizzaTypes.cheesy.name} pizza &nbsp; Type: ${pizzaTypes.cheesy.type} &nbsp;  Description: ${pizzaTypes.cheesy.description} &nbsp; Badge: ${pizzaTypes.cheesy.Badge}`;
    // }else if(dominantTrait == "rich"){
    //     baked.innerHTML = `You baked a ${pizzaTypes.rich.name} pizza &nbsp; Type: ${pizzaTypes.rich.type} &nbsp;  Description: ${pizzaTypes.rich.description} &nbsp; Badge: ${pizzaTypes.rich.Badge}`;
    // }else if(dominantTrait == "balanced"){
    //     baked.innerHTML = `You baked a ${pizzaTypes.balanced.name} pizza &nbsp; Type: ${pizzaTypes.balanced.type} &nbsp;  Description: ${pizzaTypes.balanced.description} &nbsp; Badge: ${pizzaTypes.balanced.Badge}`;
    // }else if(dominantTrait == "smoky"){
    //     baked.innerHTML = `You baked a ${pizzaTypes.smoky.name} pizza &nbsp; Type: ${pizzaTypes.smoky.type} &nbsp;  Description: ${pizzaTypes.smoky.description} &nbsp; Badge: ${pizzaTypes.smoky.Badge}`;
    // }else if(dominantTrait == "earthy"){
    //     baked.innerHTML = `You baked a ${pizzaTypes.earthy.name} pizza &nbsp; Type: ${pizzaTypes.earthy.type} &nbsp;  Description: ${pizzaTypes.earthy.description} &nbsp; Badge: ${pizzaTypes.earthy.Badge}`;
    // }else if(dominantTrait == "spicy"){
    //     baked.innerHTML = `You baked a ${pizzaTypes.spicy.name} pizza &nbsp; Type: ${pizzaTypes.spicy.type} &nbsp;  Description: ${pizzaTypes.spicy.description} &nbsp; Badge: ${pizzaTypes.spicy.Badge}`;
    // }else if(dominantTrait == "chaos"){
    //     baked.innerHTML = `You baked a ${pizzaTypes.chaos.name} pizza &nbsp; Type: ${pizzaTypes.chaos.type} &nbsp;  Description: ${pizzaTypes.chaos.description} &nbsp; Badge: ${pizzaTypes.chaos.Badge}`;
    // }else{
    //     baked.innerHTML = `You baked a ${pizzaTypes.mystery.name} pizza &nbsp; Type: ${pizzaTypes.mystery.type} &nbsp;  Description: ${pizzaTypes.mystery.description} &nbsp; Badge: ${pizzaTypes.mystery.Badge}`;
    // }

    

});




