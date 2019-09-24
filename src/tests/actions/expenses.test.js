import {
	startAddExpense,
	addExpense,
	editExpense,
	removeExpense,
	setExpenses,
	startSetExpenses,
	startRemoveExpenses,
	startEditExpense,
} from "../../actions/expenses";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import expenses from "../fixtures/expenses";
import database from "../../firebase/firebase";

const createMockStore = configureMockStore([thunk]);
const uid = "thisismytestuid";
const defaultAuthState = { auth: { uid } };

beforeEach(done => {
	const expensesData = {};
	expenses.forEach(({ id, description, note, amount, createdAt }) => {
		expensesData[id] = { description, note, amount, createdAt };
	});
	database
		.ref(`users/${uid}/expenses`)
		.set(expensesData)
		.then(() => done());
});

test("should setup remove expense action object", () => {
	const action = removeExpense({ id: "123abc" });
	expect(action).toEqual({
		type: "REMOVE_EXPENSE",
		id: "123abc",
	});
});

test("should remove expense from firebase", done => {
	const store = createMockStore(defaultAuthState);
	const id = expenses[2].id;
	store
		.dispatch(startRemoveExpenses({ id }))
		.then(() => {
			const actions = store.getActions();
			expect(actions[0]).toEqual({
				type: "REMOVE_EXPENSE",
				id,
			});
			return database.ref(`users/${uid}/expenses/${id}`).once("value");
		})
		.then(snapshot => {
			expect(snapshot.val()).toBeFalsy();
			done();
		});
});

test("should setup edit expense action object", () => {
	const action = editExpense("123abc", { note: "new note value" });
	expect(action).toEqual({
		type: "EDIT_EXPENSE",
		id: "123abc",
		updates: {
			note: "new note value",
		},
	});
});

test("should edit an expense in firebase", () => {
	const store = createMockStore(defaultAuthState);
	const id = expenses[1].id;
	const updates = {
		description: "new update",
	};
	store
		.dispatch(startEditExpense(id, updates))
		.then(() => {
			const actions = store.getActions();
			expect(actions[1].val()).toEqual({
				type: "EDIT_EXPENSE",
				id,
				updates,
			});
			return database.ref(`users/${uid}/expenses/${id}`).once("value");
		})
		.then(snapshot => {
			expect(snapshot.val()).toBe(updates.description);
		});
});

test("should setup add expense", () => {
	const action = addExpense(expenses[1]);
	expect(action).toEqual({
		type: "ADD_EXPENSE",
		expense: expenses[1],
	});
});

test("should add expense to database and store", done => {
	const store = createMockStore(defaultAuthState);
	const expenseData = {
		description: "Mouse",
		amount: 3000,
		note: "This one is better",
		createdAt: 1000,
	};
	store
		.dispatch(startAddExpense(expenseData))
		.then(() => {
			const actions = store.getActions();
			expect(actions[0]).toEqual({
				type: "ADD_EXPENSE",
				expense: {
					id: expect.any(String),
					...expenseData,
				},
			});
			return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once("value");
		})
		.then(snapshot => {
			expect(snapshot.val()).toEqual(expenseData);
			done();
		});
});

test("should add expense with defaults to database and store", done => {
	const store = createMockStore(defaultAuthState);
	const expenseData = {
		description: "",
		amount: 0,
		note: "",
		createdAt: 0,
	};
	store
		.dispatch(startAddExpense({}))
		.then(() => {
			const actions = store.getActions();
			expect(actions[0]).toEqual({
				type: "ADD_EXPENSE",
				expense: {
					id: expect.any(String),
					...expenseData,
				},
			});
			return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once("value");
		})
		.then(snapshot => {
			expect(snapshot.val()).toEqual(expenseData);
			done();
		});
});
test("should setup set Expense action object with data", () => {
	const action = setExpenses(expenses);
	expect(action).toEqual({
		type: "SET_EXPENSES",
		expenses,
	});
});

test("should fetch the expenses from firebase", done => {
	const store = createMockStore(defaultAuthState);
	store.dispatch(startSetExpenses()).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: "SET_EXPENSES",
			expenses,
		});
		done();
	});
});
