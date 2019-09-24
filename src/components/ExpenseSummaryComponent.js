import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import numeral from "numeral";
import selectExpenses from "../selectors/expenses";
import expensesTotal from "../selectors/expenses-total";

const ExpenseSummaryComponent = ({ expenseCount, expensesTotal }) => {
	const expenseWord = expenseCount === 1 ? "expense" : "expenses";
	const total = numeral(expensesTotal / 100).format("$0,0.00");

	return (
		<div className="page-header">
			<div className="content-container">
				<h1 className="page-header__title">
					Showing <span>{expenseCount} </span>
					{expenseWord} totalling <span>{total}</span>
				</h1>
				<div className="page-header__actions">
					<Link to="/create" className="button">
						Add Expense
					</Link>
				</div>
			</div>
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
