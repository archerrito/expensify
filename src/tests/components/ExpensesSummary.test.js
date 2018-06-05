import React from 'react';
import { shallow } from 'emzyme';
import { expensesSummary, ExpensesSummary } from '../../components/ExpensesSummary';

test('should correctly render expenses summary with 1 expenses', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={1} expensesTotal={235} />);
    expect(wrapper).toMatchSnapshot();
});

test('should correctly render expenses summary with 1 expenses', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={23} expensesTotal={23512340987} />);
    expect(wrapper).toMatchSnapshot();
});