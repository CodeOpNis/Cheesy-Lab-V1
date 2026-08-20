// CHEESY LAB GAME ENGINE V1

const ingredientTraits = {

    crust: {
        "Classic Dough": ["fresh"],
        "Stuffed Crust": ["rich"],
        "Volcano Crust": ["spicy"],
        "Thin Crust": ["fresh"],
        "Charcoal Dough": ["chaos"]
    },

    sauce: {
        "Tomato": ["fresh"],
        "Lava": ["spicy"],
        "Mushroom": ["earthy"],
        "Mystery": ["chaos"],
        "BBQ": ["rich"]
    },

    cheese: {
        "Mozzarella": ["fresh"],
        "Cheddar": ["rich"],
        "Nuclear Cheese": ["spicy", "chaos"],
        "Paneer": ["fresh", "rich"],
        "Parmesan": ["rich"]
    },

    toppings: {
        "Pepperoni": ["spicy", "rich"],
        "Mushroom": ["earthy"],
        "Pineapple": ["fresh", "chaos"],
        "Olives": ["fresh"],
        "Chicken": ["rich"]
    },

    seasoning: {
        "Chilli Flakes": ["spicy"],
        "Oregano": ["earthy", "fresh"],
        "Chaos Dust": ["chaos"],
        "Garlic Dust": ["rich", "earthy"]
    }
};


// BADGES

const badges = {

    // Basic

    spicy: {
        name: "Tax Dodger"
    },

    rich: {
        name: "Daily Baron"
    },

    fresh: {
        name: "Grass Toucher"
    },

    earthy: {
        name: "Mushroom Elder"
    },

    chaos: {
        name: "Kitchen Criminal"
    },

    // Hybrid

    "rich-spicy": {
        name: "Lava Investor"
    },

    "fresh-spicy": {
        name: "Controlled Burn"
    },

    "earthy-spicy": {
        name: "Campfire Goblin"
    },

    "chaos-spicy": {
        name: "Unstable Build"
    },

    "fresh-rich": {
        name: "Oxygen Plus"
    },

    "earthy-rich": {
        name: "CEO of Dirt"
    },

    "chaos-rich": {
        name: "Rug Pull Expert"
    },

    "earthy-fresh": {
        name: "Forest Signal"
    },

    "chaos-fresh": {
        name: "Strange Achievement"
    },

    "chaos-earthy": {
        name: "Compost Mage"
    },

    "mystery": {
        name: "Song An"
    },

    // Special

    "perfectBalance": {
        name: "Chosen One"
    },

    // Secret

    "nuclear-option": {
        name: "Geneva Suggestion"
    },

    "touch-grass": {
        name: "Outdoor Speedrunner"
    },

    "boss-fight": {
        name: "Health Bar Removed"
    },

    "italian-nightmare": {
        name: "Public Enemy #1"
    },

    "feature-bug": {
        name: "QA Tester"
    }

};


// SAVED BADGES

let saveBadge =
    JSON.parse(
        localStorage.getItem("saveBadge")
    ) || {};



// BADGE COLLECTION

function collectBadge(badgeId) {

    //BADGE ALIAS SYSTEM FOR LATER

    const badgeAliases = {
        //REMINDER: ADD MORE LATER
        "rich-earthy": "earthy-rich"

    };

    const resolvedBadgeId =
        badgeAliases[badgeId] || badgeId;

    if (!badges[resolvedBadgeId]) {

        console.log(
            "Unknown badge:",
            badgeId
        );

        return null;

    }

    if (!saveBadge[resolvedBadgeId]) {

        saveBadge[resolvedBadgeId] = {

            count: 1

        };

        console.log(
            "New Badge Unlocked",
            badges[resolvedBadgeId].name
        );

    }

    else {
        saveBadge[resolvedBadgeId].count++;

        console.log(

            `${badges[resolvedBadgeId].name} Obtained ` +
            `${saveBadge[resolvedBadgeId].count} times`

        );

    }

    localStorage.setItem(

        "saveBadge",

        JSON.stringify(saveBadge)

    );

    return {

        id: resolvedBadgeId,

        name: badges[resolvedBadgeId].name,

        count: saveBadge[resolvedBadgeId].count

    };

}


// PIZZA PERSONALITY

const pizzaTypes = {

    // Basic

    spicy: {
        type: "BASIC",
        name: "Dragon's Tax Envasion",
        title: "Flame Auditor",
        description: "Authorities are still investigating how this pizza got so hot without a permit.",
        badge: "spicy"
    },


    rich: {
        type: "BASIC",
        name: "The Cheese Cartel",
        title: "Dairy Baron",
        description: "Contains enough luxury to destabilize several local economies.",
        badge: "rich"
    },


    fresh: {
        type: "BASIC",
        name: "Touch Grass Supreme",
        title: "Outdoor Enthusiast",
        description: "A rare pizza crafted by someone who occasionally leaves their room.",
        badge: "fresh"
    },


    earthy: {
        type: "BASIC",
        name: "The Forest Council",
        title: "Keeper of the Shrooms",
        description: "Approved by woodland creatures and at least three suspicious wizards.",
        badge: "earthy"
    },


    chaos: {
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

};


// HYBRID PIZZAS

const pizzaHybridTypes = {

    "rich-spicy": {
        type: "HYBRID",
        name: "Molten Billionaire",
        title: "Volcano Venture Capitalist",
        description: "Rich enough to buy a volcano. Dumb enough to live inside it.",
        badge: "rich-spicy"
    },


    "fresh-spicy": {
        type: "HYBRID",
        name: "Grassfire Season",
        title: "Certified Arson Gardener",
        description: "A healthy lifestyle choice that somehow escalated into arson.",
        badge: "fresh-spicy"
    },


    "earthy-spicy": {
        type: "HYBRID",
        name: "Goblin BBQ",
        title: "Forest Menace",
        description: "Smells like a forest picnic. Tastes like an ambush encounter.",
        badge: "earthy-spicy"
    },


    "chaos-spicy": {
        type: "HYBRID",
        name: "Patch Notes Not Found",
        title: "Professional Bug Creator",
        description: "Every bite introduces a new bug. None of them are being fixed.",
        badge: "chaos-spicy"
    },


    "fresh-rich": {
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

    "chaos-rich": {
        type: "HYBRID",
        name: "Crypto Crust",
        title: "Chief Financial Mistake",
        description: "Looked valuable yesterday. Nobody knows what happened today.",
        badge: "chaos-rich"
    },


    "earthy-fresh": {
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
};


// SECRET RECIPE

const secretRecipe = {

    "top-secret-1": {
        type: "EPIC",
        name: "The Nuclear Option",
        title: "Nuclear Scientist",
        description: "Several scientists advised against this. You baked it anyway.",
        badge: "nuclear-option"
    },

    "top-secret-2": {
        type: "EPIC",
        name: "Touch Grass",
        title: "Environment Enthusiast",
        description: "The first pizza recommended by 9 out of 10 concerned parents.",
        badge: "touch-grass"
    },

    "top-secret-3": {
        type: "EPIC",
        name: "Boss Fight Phase 2",
        title: "Have you played sekiro, both causes same consequences",
        description: "This made me break the 4th wall.",
        badge: "boss-fight"
    },


    "top-secret-4": {
        type: "EPIC",
        name: "The Italian Nightmare",
        title: "Banished By Italy, Wanted By All",
        description: "Somewhere, a chef just felt a disturbance in the force.",
        badge: "italian-nightmare"
    },


    "top-secret-5": {
        type: "EPIC",
        name: "Chaotic Lover",
        title: "Undecisive Final Boss",
        description: "Want everything huh?",
        badge: "feature-bug"
    }

};


// SPECIAL OUTCOMES

const specialPizzaTypes = {

    "perfectBalance": {
        type: "SPECIAL",
        name: "Main Character Energy",
        title: "Plot Armor Holder",
        description: "Somehow balanced every flavor. The narrative has chosen you.",
        badge: "perfectBalance"
    }

};


// TRAITS SCORE CALCULATION

function calculateScores(pizza) {

    const scores = {
        spicy: 0,
        rich: 0,
        fresh: 0,
        earthy: 0,
        chaos: 0
    };

    function applyTraits(category, value) {
        if (
            !ingredientTraits[category] ||
            !ingredientTraits[category][value]
        ) {
            return;
        }

        ingredientTraits[category][value].forEach(trait => {
                scores[trait]++;
            });

    }

    applyTraits(
        "crust",
        pizza.crust
    );

    applyTraits(
        "sauce",
        pizza.sauce
    );

    applyTraits(
        "cheese",
        pizza.cheese
    );

    pizza.toppings.forEach(topping => {

        applyTraits(
            "toppings",
            topping
        );

    });

    applyTraits(
        "seasoning",
        pizza.seasoning
    );

    return scores;

}


// DOMINANT TRAIT

function getDominantTraits(scores) {

    let highest = 0;
    let secondHighest = 0;
    let dominantTrait = "";
    let secondTrait = "";

    for (const trait in scores) {

        const score =
            scores[trait];


        if (score > highest) {
            secondHighest = highest;
            secondTrait = dominantTrait;
            highest = score;
            dominantTrait = trait;
        }

        else if (
            score > secondHighest
        ) {
            secondHighest = score;
            secondTrait = trait;
        }

    }

    return {
        highest,
        secondHighest,
        dominantTrait,
        secondTrait
    };

}


// PIZZA VALIDATION

function validatePizza(selection) {

    if (!selection) {
        return {
            valid: false,
            message: "No pizza selection received."
        };
    }

    if (!selection.crust) {

        return {
            valid: false,
            message: "Please select a crust."
        };
    }

    if (!selection.sauce) {

        return {
            valid: false,
            message: "Please select a sauce."
        };
    }

    if (!selection.cheese) {

        return {
            valid: false,
            message: "Please select a cheese."
        };
    }

    if (!selection.seasoning) {

        return {
            valid: false,
            message: "Please select a seasoning."
        };
    }

    if (
        !Array.isArray(selection.toppings) ||
        selection.toppings.length === 0
    ) {

        return {
            valid: false,
            message: "Please select at least one topping."
        };

    }

    return {
        valid: true
    };

}


// BAKE PIZZA

function bakePizza(selection) {

    const validation = validatePizza(selection);

    if (!validation.valid) {

        return {
            success: false,

            error:
                validation.message

        };

    }

    const pizza = {
        crust: selection.crust,
        sauce: selection.sauce,
        cheese: selection.cheese,
        toppings: [...selection.toppings],
        seasoning: selection.seasoning
    };


    const scores = calculateScores(pizza);

    const {
        highest,
        secondHighest,
        dominantTrait,
        secondTrait
    } = getDominantTraits(scores);

    let bakedPizza;

// SECRET PIZZA #1

    if (
        pizza.crust === "Charcoal Dough" &&
        pizza.sauce === "Mystery" &&
        pizza.cheese === "Nuclear Cheese" &&
        pizza.seasoning === "Chaos Dust" &&
        pizza.toppings.includes("Pineapple")
    ) {
        bakedPizza =
            secretRecipe["top-secret-1"];
    }

// SECRET PIZZA #2

    else if (
        pizza.crust === "Thin Crust" &&
        pizza.sauce === "Tomato" &&
        pizza.cheese === "Mozzarella" &&
        pizza.seasoning === "Oregano" &&
        pizza.toppings.includes("Olives")
    ) {
        bakedPizza =
            secretRecipe["top-secret-2"];
    }

// SECRET PIZZA #3

    else if (
        pizza.crust === "Volcano Crust" &&
        pizza.sauce === "Lava" &&
        pizza.cheese === "Nuclear Cheese" &&
        pizza.seasoning === "Chilli Flakes" &&
        pizza.toppings.includes("Pepperoni")
    ) {
        bakedPizza =
            secretRecipe["top-secret-3"];
    }

// SECRET PIZZA #4

    else if (
        pizza.sauce === "Mystery" &&
        pizza.cheese === "Nuclear Cheese" &&
        pizza.toppings.includes("Pineapple")
    ) {
        bakedPizza =
            secretRecipe["top-secret-4"];
    }

// SECRET PIZZA #5

    else if (
        scores.chaos >= 3
    ) {
        bakedPizza =
            secretRecipe["top-secret-5"];
    }

// PERFECT BALANCE

    else if (
        scores.spicy === 1 &&
        scores.rich === 1 &&
        scores.fresh === 1 &&
        scores.earthy === 1 &&
        scores.chaos === 1
    ) {
        bakedPizza =
            specialPizzaTypes["perfectBalance"];
    }

// HYBRID

    else if (
        highest === secondHighest
    ) {
        const hybridKey = [
            dominantTrait,
            secondTrait
        ]
            .sort()
            .join("-");

        bakedPizza =
            pizzaHybridTypes[hybridKey];

    }


// BASIC

    else if (

        pizzaTypes[dominantTrait]

    ) {

        bakedPizza =
            pizzaTypes[dominantTrait];

    }

// FALLBACK

    else {
        bakedPizza =
            pizzaTypes["mystery"];
    }


// if hybrid key isn't present

    if (!bakedPizza) {

        bakedPizza =
            pizzaTypes["mystery"];

    }


// BADGE

    const badgeId = bakedPizza.badge;

    const badge =
        collectBadge(
            badgeId
        );


    return {
        success: true,
        pizza: bakedPizza,
        badge,
        scores,
        selection: pizza
    };

}


// PUBLIC GAME ENGINE

window.cheesyLabGame = {
    bake: bakePizza,
    getBadges() {
        return {
            ...saveBadge
        };
    },

    getBadgeDefinitions() {
        return badges;
    },

    getPizzaTypes() {
        return pizzaTypes;
    },

    getHybridTypes() {
        return pizzaHybridTypes;
    },

    getSecretRecipes() {
        return secretRecipe;
    }

};