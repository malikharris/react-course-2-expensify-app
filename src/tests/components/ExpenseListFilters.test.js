import React from "react";
import { shallow } from "enzyme";
import { ExpenseListFilters } from "../../components/ExpenseListFilters";
import { filters, altFilters } from "../fixtures/filters";
import moment from "moment";
import { start } from "repl";

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
	setTextFilter = jest.fn();
	sortByAmount = jest.fn();
	sortByDate = jest.fn();
	setStartDate = jest.fn();
	setEndDate = jest.fn();
	wrapper = shallow(
		<ExpenseListFilters
			filters={filters}
			setTextFilter={setTextFilter}
			sortByAmount={sortByAmount}
			sortByDate={sortByDate}
			setStartDate={setStartDate}
			setEndDate={setEndDate}
		/>,
	);
});

test("should render ExpenseListFilters correctly", () => {
	expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseListFilters correctly with alt data correctly", () => {
	wrapper.setProps({ filters: altFilters });
	expect(wrapper).toMatchSnapshot();
});

test("should handle text change", () => {
	const value = "rent";
	wrapper.find("input").simulate("change", {
		target: { value },
	});
	expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test("should sort by date", () => {
	const value = "date";
	wrapper.find("select").simulate("change", {
		target: { value },
	});
	expect(sortByDate).toHaveBeenCalled();
});

test("should sort by date", () => {
	const value = "amount";
	wrapper.find("select").simulate("change", {
		target: { value },
	});
	expect(sortByAmount).toHaveBeenCalled();
});

test("should handle date changes", () => {
	const startDate = moment(0).add(2, "months");
	const endDate = moment(0).add(2, "months");
	wrapper.find("DateRangePicker").prop("onDatesChange")({ startDate, endDate });
	expect(setStartDate).toHaveBeenLastCalledWith(startDate);
	expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test("should handle date focus changes", () => {
	const value = "endDate";
	wrapper.find("DateRangePicker").prop("onFocusChange")(value);
	expect(wrapper.state("calenderFocused")).toBe(value);
});
