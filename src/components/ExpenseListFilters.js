import React from "react";
import { connect } from "react-redux";
import {
	setTextFilter,
	sortByDate,
	sortByAmount,
	setEndDate,
	setStartDate,
} from "../actions/filters";
import { DateRangePicker } from "react-dates";

export class ExpenseListFilters extends React.Component {
	state = {
		calenderFocused: null,
	};
	onDatesChange = ({ startDate, endDate }) => {
		this.props.setEndDate(endDate);
		this.props.setStartDate(startDate);
	};

	onFocusChange = calenderFocused => {
		this.setState(() => ({ calenderFocused }));
	};
	onTextChange = e => {
		this.props.setTextFilter(e.target.value);
	};
	onSortChange = e => {
		{
			if (e.target.value === "date") {
				this.props.sortByDate();
			} else if (e.target.value === "amount") {
				this.props.sortByAmount();
			}
		}
	};
	render() {
		return (
			<div className="content-container">
				<div className="input-group">
					<div className="input-group--item">
						<input
							className="text-input"
							type="text"
							placeholder="Search Expenses"
							value={this.props.filters.text}
							onChange={this.onTextChange}
						/>
					</div>
					<div className="input-group--item">
						<select
							className="select"
							value={this.props.filters.sortBy}
							onChange={this.onSortChange}
						>
							<option value="date">Date</option>
							<option value="amount">Amount</option>
						</select>
					</div>
					<div className="input-group--item">
						<DateRangePicker
							startDate={this.props.filters.startDate}
							endDate={this.props.filters.endDate}
							onDatesChange={this.onDatesChange}
							focusedInput={this.state.calenderFocused}
							onFocusChange={this.onFocusChange}
						/>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		filters: state.filters,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setTextFilter: text => dispatch(setTextFilter(text)),
		sortByDate: () => dispatch(sortByDate),
		sortByAmount: () => dispatch(sortByAmount),
		setStartDate: startDate => dispatch(setStartDate(startDate)),
		setEndDate: endDate => dispatch(setEndDate(endDate)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ExpenseListFilters);
