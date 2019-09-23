// const person = {
// 	age: 23,
// 	location: {
// 		city: "Frisco",
// 		temp: 97,
// 	},
// };
// const { name = "Anonymous", age } = person;

// console.log(`${name} is ${age}`);

// const { city, temp } = person.location;
// if (city && temp) {
// 	console.log(`Its ${temp} in ${city}`);
// }

// const book = {
// 	title: "Ego is the Enemy",
// 	author: "Ryan Holiday",
// 	publisher: {
// 		name: "Penguin",
// 	},
// };

// const { name: publisherName = "Self-Published" } = book.publisher;

// console.log(publisherName);

const address = ["8024 Elm Fork Dr", "Dallas"];

const [street, city, state = "Illinois", zip] = address;

console.log(`You are in ${city}, ${state}.`);

const item = ["Coffee (hot)", "$2.00", "$2.50", "$2.75"];

const [itemName, , mediumPrice] = item;

console.log(`A medium ${itemName} costs ${mediumPrice}`);
