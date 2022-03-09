//Products List
var materialList = {
	pickle: 5,
	sauce: 2,
	onion: 5,
	meatball: 5,
	chicken: 5,
	tomato: 5,
	bread: 5,
	fries: 5,
	coke: 5,
};

// What to do in order
const todos = [
	{ id: 0, description: "Order has been taken" },
	{ id: 1, description: "Stock control in progress" },
	{ id: 2, description: "Checking Meatball or Chicken" },
	{
		id: 3,
		description: "Meatballs selected. Undercooked meatballs are being prepared",
	},
	{
		id: 4,
		description: "Meatballs selected. Medium cooked meatballs are being prepared",
	},
	{
		id: 5,
		description: "Meatballs selected. Cooked meatballs are being prepared",
	},
	{ id: 6, description: "Chicken selected and cooking" },
	{ id: 7, description: "Potatoes are being prepared" },
	{ id: 8, description: "Drinks are being prepared" },
	{ id: 9, description: "Put Sauces and Products on Serving Tray" },
	{ id: 10, description: "Your order is ready, enjoy your meal !!!" },
];

// The Object values method returns the values in the object as an array, 
// every method checks all the elements of the array against the condition and return true or false
function checkMaterialList(materialList) {
	return Object.values(materialList).every((element) => element > 0);
}

//function that we convert todosto promises
function newTodo(todo, timeout) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(console.log(todo.description));
		}, timeout);
	});
}

// checking Meatball cooking time
async function cookingTime(time) {
	switch (time) {
		case "well":
			await newTodo(todos[5], 4000);
			break;

		case "medium":
			await newTodo(todos[4], 3000);
			break;

		case "rare":
			await newTodo(todos[3], 2000);
			break;
			
		default:
			break;
	}
}

//check stock and return rest products list
function stockDecrease(meatType, list) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			Object.entries(list).map((element) => {
				if (meatType == "meatball") {
					list[element[0]] -= 1;
					if (element[0] === "chicken") {
						list[element[0]]++;
					}
				} else {
					if (element[0] === "meatball") {
						list[element[0]]++;
					}
					list[element[0]] -= 1;
				}
			});
			resolve(console.log("Hamburger prepared !"));
		}, 1000);
	});
}

//check meatball or chicken
async function burger(order, list) {
	await newTodo(todos[2], 1000);
	if (order.meat === "meatball") {
		await cookingTime(order.cookTime);
	} else {
		await newTodo(todos[6], 3000);
	}
	await stockDecrease(order.meat, list);
}

//function provides 3-4-5 steps start at same time
async function layer(order, list) {
	return new Promise((resolve, reject) => {
		resolve(
			burger(order, list),
			newTodo(todos[7], 5000),
			newTodo(todos[8], 2000)
		);
	});
}
let err ="1";

// start preparing the order
async function meal(order, list) {
	await newTodo(todos[0], 1000);
	await newTodo(todos[1], 3000);
	if (checkMaterialList(list)) {
		console.log("We have material in stock");
		await layer(order, list);
		await newTodo(todos[9], 1000);
		await newTodo(todos[10], 1000);
		err = true;
	} else {
		err = false;
		console.error("There is a shortage of material in stock !!");
	}

	console.log(materialList);
}

// orders
let order1 = {
	meat: "meatball",
	cookTime: "well",
};
let order2 = {
	meat: "meatball",
	cookTime: "medium",
};
let order3 = {
	meat: "meatball",
	cookTime: "rare",
};
let order4 = {
	meat: "chicken",
};

//Main function
async function main(amount,type) {
	for (let i = 0; i < amount; i++) {
		if(err == true){
			await meal(type, materialList);
		}
	}	
}

// User input values
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question(`Welcome, meatball or chicken? 
Check and write order1 if you want this menu:
meat: meatball
cookTime: well
write order2 if you want this menu:
meat: meatball
cookTime: medium
write order3 if you want this menu:
meat: meatball
cookTime: rare
write order4 if you want this menu:
meat: chicken
 `, function(name) {
    rl.question("How many hamburger? ", function(amount) {
        console.log(`your ${amount} piece ${name} hamburger menu is getting prepared!`);
		if(name == "order1")
		{
			main(amount,order1);
		}else if(name == "order2")
		{
			main(amount,order2);
		}else if(name == "order3")
		{
			main(amount,order3);
		}else 
			main(amount, order4);
        rl.close();
    });
});

