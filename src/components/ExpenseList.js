import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectedExpenses from '../selectors/expenses';

//stateless functional component
export const ExpenseList = (props) => (
    <div className="content-container">
    <div className="list-header">
        <div className="show-for-mobile">Expenses</div>
        <div className="show-for-desktop">Expense</div>
        <div className="show-for-desktop">Amount</div>
    </div>
        <div className="list-body">
            {
                props.expenses.length === 0 ? (
                <div className="list-item list-item--message">
                    <span>No expenses</span>
                </div>
            ) : (
                props.expenses.map((expense) => {
                    return <ExpenseListItem key={expense.id} {...expense} />;
                })
                )
            }
        </div>
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