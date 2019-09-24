import expensesReducer from "../../reducers/expenses";
import expenses from "../fixtures/expenses";

test("should set default state", () => {
	const state = expensesReducer(undefined, { type: "@@INIT" });
	expect(state).toEqual([]);
});

test("should remove expense by id", () => {
	const action = {
		type: "REMOVE_EXPENSE",
		id: expenses[1].id,
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual([expenses[0], expenses[2]]);
});

test("should remove expense by id", () => {
	const action = {
		type: "REMOVE_EXPENSE",
		id: -1,
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual(expenses);
});

test("should add expense", () => {
	const expense = {
		id: "4",
		description: "gumbo",
		note: "",
		amount: 585,
		createdAt: 0,
	};
	const action = {
		type: "ADD_EXPENSE",
		expense,
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual([...expenses, expense]);
});

test("should edit an expense with valid id", () => {
	const description = "Car";
	const action = {
		type: "EDIT_EXPENSE",
		id: expenses[0].id,
		updates: {
			description,
		},
	};
	const state = expensesReducer(expenses, action);
	expect(state[0].description).toEqual(description);
});

test("should not edit an expense", () => {
	const description = "Car";
	const action = {
		type: "EDIT_EXPENSE",
		id: -1,
		updates: {
			description,
		},
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual(expenses);
});

test("should set expenses", () => {
	const action = {
		type: "SET_EXPENSES",
		expenses: [expenses[1]],
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual([expenses[1]]);
});
