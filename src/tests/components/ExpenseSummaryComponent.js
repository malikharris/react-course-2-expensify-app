import React from "react";
import { shallow } from "enzyme";
import ExpenseSummaryComponent from "../../components/ExpenseSummaryComponent";
test("should correctly render expenses with 1 expense", () => {
	const wrapper = shallow(<ExpenseSummaryComponent expenseCount={1} expensesTotal={500} />);
	expect(wrapper).toMatchSnapshot();
});

test("should correctly render expenses with 1 expense", () => {
	const wrapper = shallow(<ExpenseSummaryComponent expenseCount={10} expensesTotal={50000} />);
	expect(wrapper).toMatchSnapshot();
});
