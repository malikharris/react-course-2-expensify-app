import React from "react";
import { connect } from "react-redux";
import numeral from "numeral";
import selectExpenses from "../selectors/expenses";
import expensesTotal from "../selectors/expenses-total";

const ExpenseSummaryComponent = ({ expenseCount, expensesTotal }) => {
	const expenseWord = expenseCount === 1 ? "expense" : "expenses";
	const total = numeral(expensesTotal / 100).format("$0.0.00");

	return (
		<div>
			<h1>
				Showing {expenseCount} {expenseWord} totalling {total}
			</h1>
		</div>
	);
};

const mapStateToProps = state => {
	const filteredExpenses = selectExpenses(state.expenses, state.filters);
	return {
		expenseCount: filteredExpenses.length,
		expensesTotal: expensesTotal(filteredExpenses),
	};
};

export default connect(mapStateToProps)(ExpenseSummaryComponent);
