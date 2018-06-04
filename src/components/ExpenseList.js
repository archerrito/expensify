import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectedExpenses from '../selectors/expenses';

//stateless functional component
export const ExpenseList = (props) => (
    <div>
    <h1>ExpenseList</h1>
    {props.expenses.map((expense) => {
        return <ExpenseListItem key={expense.id} {...expense} />;
    })}
    </div>
);

const mapStateToProps = (state) => {
    return {
        //connected component has access to info in store
        expenses: selectedExpenses(state.expenses, state.filters)
    };
};

export default connect(mapStateToProps)(ExpenseList);


// //Get back function, pass in state from store
// const ConnectedExpenseList = connect((state) => {
//     return {
//         //connected component has access to info in store
//         expenses: state.expenses
//     };
// })(ExpenseList);

// export default ConnectedExpenseList;