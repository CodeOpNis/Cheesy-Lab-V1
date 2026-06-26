const form = document.getElementById("ingredients-list");
const result = document.getElementById("result");
const baked = document.getElementById("pizza-ready");
const saveBadge = {}

    //Badges
        const badges = {
                    //Basic 
            spicy:{
                name: "Tax Dodger"
            },
            rich:{
                name: "Daily Baron"
            },
            fresh:{
                name: "Grass Toucher"
            },
            earthy:{
                name: "Mushroom Elder"
            },
            chaos:{
                name: "Kitchen Criminal"
            },

                    //Hybrid
            "rich-spicy":{
                name: "Lava Investor",
            },
            "fresh-spicy":{
                name: "Controlled Burn",
            },
            "earthy-spicy":{
                name: "Campfire Goblin",
            },
            "chaos-spicy":{
                name: "Unstable Build",
            },
            "fresh-rich":{
                name: "Oxygen Plus",
            },
            "earthy-rich":{
                name: "CEO of Dirt",
            },
            "chaos-rich":{
                name: "Rug Pull Expert",
            },
            "earthy-fresh":{
                name: "Forest Signal",
            },
            "chaos-fresh":{
                name: "Strange Achievement",
            },
            "chaos-earthy":{
                name: "Compost Mage",
            },
            "mystery":{
                name: "Song An"
            },

                    //Special
            "perfectBalance": {
                name: "Chosen One"
            },

                    //Secret
            "nuclear-option":{
                name: "Geneva Suggestion"
            },
            "touch-grass":{
                name: "Outdoor Speedrunner"
            },
            "boss-fight":{
                name: "Health Bar Removed"
            },
            "italian-nightmare":{
                name: "Public Enemy #1"
            },
            "feature-bug":{
                name: "QA Tester"
            },
        };


function collectBadge(badgeId){

    if(!saveBadge[badgeId]){
        saveBadge[badgeId] = {
            count: 1
        };

        console.log("New Badge Unlocked", badges[badgeId].name);
        
    }else{
        saveBadge[badgeId].count++;

        console.log(`${badges[badgeId].name} Obtained ${saveBadge[badgeId].count} times`);
    };
}


form.addEventListener("submit", function (event) {
    event.preventDefault();

    // 5 core traits, score calculations
    const scores = {
        spicy: 0,
        rich: 0,
        fresh: 0,
        earthy: 0,
        chaos: 0
    };

    // Get exactly one choice from each category
    const sizeInput = document.querySelector('input[name="size"]:checked'); 
    const crust = document.querySelector('input[name="crust"]:checked');
    const sauce = document.querySelector('input[name="sauce"]:checked');
    const cheese = document.querySelector('input[name="cheese"]:checked');
    const seasoning = document.querySelector('input[name="seasoning"]:checked');

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

    // TRAITS CALCULATOR 
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

    if (!cheese) { 
        result.textContent = "Please select a cheese.";
        return; 
    }

    if (!seasoning) { 
        result.textContent = "Please select a seasoning.";
        return; 
    }

    if (toppings.length === 0) {
        result.textContent = "Please select at least one topping.";
        return;
    }

    // Pizza Object
    const pizza = {
        size: sizeInput.value,
        crust: crust.value,
        sauce: sauce.value,
        cheese: cheese.value,
        toppings: toppings,
        seasoning: seasoning.value
    };

    // Build result dialogue
    const pizzaText =  `You ordered a ${pizza.size} pizza with ${pizza.crust} crust, ${pizza.sauce} sauce, ${pizza.cheese} cheese, toppings: ${pizza.toppings.join(", ")}, and ${pizza.seasoning} seasoning.`;

    result.innerHTML = 
    `<h3>Your Pizza</h3>
    <p>${pizzaText}</p>`;

    // if (!cheese && !seasoning) { pizzaText = You ordered a ${sizeInput.value} pizza with ${crust.value} crust; } else if (!cheese && seasoning) { pizzaText = You ordered a ${sizeInput.value} pizza with ${crust.value} crust, seasoned with ${seasoning.value}; } else if (cheese && !seasoning) { pizzaText = You ordered a ${sizeInput.value} pizza with ${crust.value} crust and ${cheese.value} cheese; } else { pizzaText = You ordered a ${sizeInput.value} pizza with ${crust.value} crust and ${cheese.value} cheese, seasoned with ${seasoning.value}; }

    console.log(scores);

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
            // console.log("New Highest Found");
            // console.log("Highest:", dominantTrait, highest);
            // console.log("Second:", secondTrait, secondHighest);
        }else if (score > secondHighest) {
            secondHighest = score;
            secondTrait = trait;
            // console.log("New Second Highest Found");
            // console.log("Second:", secondTrait, secondHighest);
        }
    }

    //Badge Save System
   

    //PIZZA PERSONALITY
            //Basic Pizzas
    const pizzaTypes = {
        
        spicy:{
            type: "BASIC",
            name: "Dragon's Tax Envasion",
            title: "Flame Auditor",
            description: "Authorities are still investigating how this pizza got so hot without a permit.",
            badge: "spicy"
        },
        rich:{
            type: "BASIC",
            name: "The Cheese Cartel",
            title: "Dairy Baron",
            description: "Contains enough luxury to destabilize several local economies.",
            badge: "rich"
        },
        fresh:{
            type: "BASIC",
            name: "Touch Grass Supreme",
            title: "Outdoor Enthusiast",
            description: "A rare pizza crafted by someone who occasionally leaves their room.",
            badge: "fresh"
        },
        earthy:{
            type: "BASIC",
            name: "The Forest Council",
            title: "Keeper of the Shrooms",
            description: "Approved by woodland creatures and at least three suspicious wizards.",
            badge: "earthy"
        },
        chaos:{
            type: "BASIC",
            name: "The Oven Incident",
            title: "Agent of Mayhem",
            description: "Nobody knows what happened. The oven refuses to comment.",
            badge: "chaos"
        },
        mystery: {
            type: "SPECIAL",
            name: "The Developer Forgot To Account For This",
            title: "Unintentional Pioneer",
            description: "You discovered a pizza that exists purely because the code gave up.",
            badge: "feature-bug"
        }
    }

            //Hybrid Pizzas
    const pizzaHybridTypes = {

        "rich-spicy":{
            type: "HYBRID",
            name: "Molten Billionaire",
            title: "Volcano Venture Capitalist",
            description: "Rich enough to buy a volcano. Dumb enough to live inside it.",
            badge: "rich-spicy"
        },
        "fresh-spicy":{
            type: "HYBRID",
            name: "Grassfire Season",
            title: "Certified Arson Gardener",
            description: "A healthy lifestyle choice that somehow escalated into arson.",
            badge: "fresh-spicy"
        },
        "earthy-spicy":{
            type: "HYBRID",
            name: "Goblin BBQ",
            title: "Forest Menace",
            description: "Smells like a forest picnic. Tastes like an ambush encounter.",
            badge: "earthy-spicy"
        },
        "chaos-spicy":{
            type: "HYBRID",
            name: "Patch Notes Not Found",
            title: "Professional Bug Creator",
            description: "Every bite introduces a new bug. None of them are being fixed.",
            badge: "chaos-spicy"
        },
        "fresh-rich":{
            type: "HYBRID",
            name: "Premium Air Subscription",
            title: "CEO of Breathing",
            description: "Somehow convinced people to pay extra for things they already had.",
            badge: "fresh-rich"
        },
        "earthy-rich": {
            type: "HYBRID",
            name: "Mushroom Tycoon",
            title: "Underground Billionaire",
            description: "Started with one mushroom. Built an empire. Refuses to elaborate.",
            badge: "rich-earthy"
        },
        "chaos-rich":{
            type: "HYBRID",
            name: "Crypto Crust",
            title: "Chief Financial Mistake",
            description: "Looked valuable yesterday. Nobody knows what happened today.",
            badge: "chaos-rich"
        },
        "earthy-fresh":{
            type: "HYBRID",
            name: "Nature's WiFi",
            title: "Receiver of Leaf Messages",
            description: "Connection strength: excellent. Social skills: still loading.",
            badge: "fresh-earthy"
        },
        "chaos-fresh": {
            type: "HYBRID",
            name: "Certified Weird Flex",
            title: "Reality Tester",
            description: "This pizza shouldn't work. Unfortunately, it absolutely does.",
            badge: "chaos-fresh"
        },
        "chaos-earthy": {
            type: "HYBRID",
            name: "Forbidden Compost",
            title: "Archdruid of Garbage",
            description: "A dark ritual was performed. The vegetables won.",
            badge: "chaos-earthy"
        }
    }

            //Secret Recipes
        const secretRecipe = {
            "top-secret-1":{
                type: "EPIC",
                name: "The Nuclear Option",
                title: "Nuclear Scientist",
                description: "Several scientists advised against this. You baked it anyway.",
                badge: "nuclear-option"
            },
            "top-secret-2":{
                type: "EPIC",
                name: "Touch Grass",
                title: "Environment Enthusiast",
                description: "The first pizza recommended by 9 out of 10 concerned parents.",
                badge: "touch-grass"
            },
            "top-secret-3":{
                type: "EPIC",
                name: "Boss Fight Phase 2",
                title: "Have you played sekiro, both causes same consequences",
                description: "This made me break the 4th wall.",
                badge: "boss-fight"
            },
            "top-secret-4":{
                type: "EPIC",
                name: "The Italian Nightmare",
                title: "Banished By Italy, Wanted By All",
                description: "Somewhere, a chef just felt a disturbance in the force.",
                badge: "italian-nightmare"
            },
            "top-secret-5":{
                type: "EPIC",
                name: "Chaotic Lover",
                title: "Undecisive Final Boss",
                description: "Want everything huh?",
                badge: "feature-bug"
            }
        }

                //Special Outcomes
        const specialPizzaTypes = {
            "perfectBalance": {
            type: "SPECIAL",
            name: "Main Character Energy",
            title: "Plot Armor Holder",
            description: "Somehow balanced every flavor. The narrative has chosen you.",
            badge: "perfectBalance",
    }
}

     //BAKING PIZZA

     let bakedPizza;

     //Secret Pizza
     if(   
        pizza.crust === "Charcoal Dough" &&
        pizza.sauce === "Mystery" &&
        pizza.cheese === "Nuclear Cheese" &&
        pizza.seasoning === "Chaos Dust" &&
        pizza.toppings.includes("Pineapple")
    ){
        bakedPizza = secretRecipe["top-secret-1"];
    }

    else if(
        pizza.crust === "Thin Crust" &&
        pizza.sauce === "Tomato" &&
        pizza.cheese === "Mozzarella" &&
        pizza.seasoning === "Oregano" &&
        pizza.toppings.includes("Olives")
    ){
        bakedPizza = secretRecipe["top-secret-2"];
    }

    else if(
        pizza.crust === "Volcano Crust" &&
        pizza.sauce === "Lava" &&
        pizza.cheese === "Nuclear Cheese" &&
        pizza.seasoning === "Chilli Flakes" &&
        pizza.toppings.includes("Pepperoni")
    ){
        bakedPizza = secretRecipe["top-secret-3"];
    }

    else if( 
    pizza.sauce === "Mystery" &&
    pizza.cheese === "Nuclear Cheese" &&
    pizza.toppings.includes("Pineapple")
    ){
        bakedPizza = secretRecipe["top-secret-4"];    
    }

    else if(
        scores.chaos>=3
    ){
        bakedPizza = secretRecipe["top-secret-5"];
    }

    //Special Outcome
    else if(
    scores.spicy === 1 &&
    scores.rich === 1 &&
    scores.fresh === 1 &&
    scores.earthy === 1 &&
    scores.chaos === 1
    ){
        bakedPizza = specialPizzaTypes["perfectBalance"];
    }

    //Hybrid Pizza
    else if(
        highest === secondHighest
    ){
        const hybridKey = [dominantTrait, secondTrait].sort().join("-"); //hybrid key manager to sort so the key matches the exact defined one
        bakedPizza = pizzaHybridTypes[hybridKey];
    }

    //Basic Pizza
    else if (pizzaTypes[dominantTrait]
    ){
    bakedPizza = pizzaTypes[dominantTrait];
    }   

    //Fallback
    else {
    bakedPizza = pizzaTypes["mystery"];
    }

    baked.innerHTML = 
    `<h3>Type: ${bakedPizza.type}</h3>
    <p><b>${bakedPizza.name}</b></p>
    <p>Title: ${bakedPizza.title}</p>
    <p>${bakedPizza.description}</p>`


    // const badgeId = bakedPizza.badge;
    // collectBadge(badgeId);

    // console.table(badgeSave);

    const badgeId = bakedPizza.badge;

    collectBadge(badgeId);

    console.table(saveBadge);
    console.log("Badge ID:", badgeId);
    console.log("Badge Object:", badges[badgeId]);

    // console.log("Highest:", highest);
    // console.log("Second Highest:", secondHighest);
    // console.log("Dominant:", dominantTrait);
    // console.log("Second:", secondTrait);
});