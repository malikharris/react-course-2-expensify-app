import React from "react";
import ExpenseList from "./ExpenseList";
import ExpenseListFilters from "./ExpenseListFilters";
import ExpenseListItem from "./ExpenseListItem";
import ExpenseSummaryComponent from "./ExpenseSummaryComponent";

const ExpenseDashboardPage = () => (
	<div>
		<ExpenseSummaryComponent />
		<ExpenseList />
		<ExpenseListFilters />
	</div>
);

export default ExpenseDashboardPage;
