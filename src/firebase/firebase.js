import * as firebase from "firebase";

const config = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.FIREBASE_DATABASE_URL,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.FIREBASE_APP_ID,
};

firebase.initializeApp(config);

const database = firebase.database();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { googleAuthProvider, firebase, database as default };

// database.ref("expenses").on("child_removed", snapshot => {
// 	console.log(snapshot.key, snapshot.val());
// });

// database.ref("expenses").on("child_changed", snapshot => {
// 	console.log(snapshot.key, snapshot.val());
// });

// database.ref("expenses").on("child_added", snapshot => {
// 	console.log(snapshot.key, snapshot.val());
// });

// database.ref("expenses").on("value", snapshot => {
// 	const expenses = [];
// 	snapshot.forEach(childSnapshot => {
// 		expenses.push({
// 			id: childSnapshot.key,
// 			...childSnapshot.val(),
// 		});
// 	});

// 	console.log(expenses);
// });

// database.ref("expenses").push({
// 	id: "2",
// 	description: "Rent",
// 	note: "",
// 	amount: 1009500,
// });

// database.ref().set({
// 	name: "Malik Harris",
// 	age: 23,
// 	location: {
// 		city: "Dallas",
// 		country: "United States",
// 	},
// });

// database.ref().update({
// 	name: "Mike",
// 	age: "26",
// 	isSingle: null,
// });
