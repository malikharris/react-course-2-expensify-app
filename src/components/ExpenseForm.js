import React from "react";
import moment from "moment";
import { SingleDatePicker } from "react-dates";

const now = moment();
console.log(now.format("MMM Do, YYYY"));

export default class ExpenseForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			description: props.expense ? props.expense.description : "",
			note: props.expense ? props.expense.note : "",
			amount: props.expense ? (props.expense.amount / 100).toString() : "",
			createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
			error: "",
			calendarFocused: false,
		};
	}

	onDescriptionChange = e => {
		const description = e.target.value;
		this.setState(() => ({ description }));
	};

	onNoteChange = e => {
		const note = e.target.value;
		this.setState(() => ({ note }));
	};

	onAmountChange = e => {
		const amount = e.target.value;
		if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
			this.setState(() => ({ amount }));
		}
	};

	onFocusChange = ({ focused }) => {
		this.setState(() => ({ calendarFocused: focused }));
	};

	onDateChange = createdAt => {
		if (createdAt) {
			this.setState(() => ({ createdAt }));
		}
	};

	onSubmit = e => {
		e.preventDefault();

		if (!this.state.description || !this.state.amount) {
			this.setState(() => ({
				error: "Please provide description and amount",
			}));
		} else {
			this.setState(() => ({
				error: "",
			}));
			this.props.onSubmit({
				description: this.state.description,
				amount: parseFloat(this.state.amount, 10) * 100,
				createdAt: this.state.createdAt.valueOf(),
				note: this.state.note,
			});
			console.log("submitted");
		}
	};

	render() {
		return (
			<form onSubmit={this.onSubmit} className="form">
				{this.state.error && <p className="form__error">{this.state.error}</p>}
				<input
					type="text"
					className="text-input"
					placeholder="Description"
					autoFocus
					value={this.state.description}
					onChange={this.onDescriptionChange}
				/>
				<input
					type="text"
					className="text-input"
					placeholder="Amount"
					onChange={this.onAmountChange}
					value={this.state.amount}
				/>
				<SingleDatePicker
					date={this.state.createdAt}
					onDateChange={this.onDateChange}
					focused={this.state.calendarFocused}
					onFocusChange={this.onFocusChange}
					isOutsideRange={() => false}
					numberOfMonths={1}
				/>
				<textarea
					placeholder="Add a note for your expense(optional)"
					className="textarea"
					onChange={this.onNoteChange}
					value={this.state.note}
				></textarea>

				<div>
					<button className="button">Save Expense</button>
				</div>
			</form>
		);
	}
}
