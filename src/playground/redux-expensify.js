import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

//Add Expense
const addExpense = (
    { 
        description = '',
        note = '',
        amount = 0,
        createdAt = 0
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    } 
});

//Remove Expense
const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

//Edit Expense
const editExpense = (id, updates) => ({
    type:'EDIT_EXPENSE',
    id,
    updates
});

//Set Text Filter
const setTextFilter = (text = '') => ({
    type:'SET_TEXT_FILTER',
    text
});

//Sort Amount
const sortByAmount = () => ({
    type:'SORT_BY_AMOUNT',
});

//Sort Date
const sortByDate = () => ({
    type:'SORT_BY_DATE',
    text
});

//Set Start Date
const setStartDate = (startDate) => ({
    type:'SET_START_DATE',
    startDate
});

//Set End Date
const setEndDate = (endDate) => ({
    type:'SET_END_DATE',
    endDate
});

//expenses Reducer
const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ];
        case 'REMOVE_EXPENSE':
            //filter returns T/F if true, kept, if not, removed
            return state.filter(({ id}) => id != action.id);
        case 'EDIT_EXPENSE':
            return state.map ((expense) => {
                //current expense iterating over equal to expense want to change
                if (expense.id === action.id) {
                    return {
                        //spread to grab all properties from existing, description, id, note, createdAt
                        ...expense,
                        //override ones passed in
                        ...action.updates 
                    };

                } else {
                    //do nothing
                    return expense;
                }
            });
        default:
            return state;
    }
};

//Filters Reducer
//expenses Reducer
const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: 'undefined',
    endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            };
        case 'SORT_BY_DATE':
            return {
                ...state,
                SortBy: 'date'
            };
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            };
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            };
        default:
            return state;
    }
};

//Timestamps
//counting in ms, positive forward, neg, past
//jan 1 1970, unix epoch


//Get Visible expenses
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense)=> {
        //checks if start date is not a number, true, won't filter
        //if is then checks if greater than start date, so filters out
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        //all true kept in, all false, removed
        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b)=> {
        if (sortBy === 'date') {
            //toss b first, most recent up top
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy === 'amount') {
            //1 b comes first
            return a.amount < b.amount ? 1 : -1;
        }

    });
};

//store creation
const store = createStore(
    combineReducers({
        expenses:expensesReducer,
        filters: filtersReducer

    })
);

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 1500, createdAt: -21000}));
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 300, createdAt: -1000}));

// store.dispatch(removeExpense({id: expenseOne.expense.id}));

// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500}));

//store.dispatch(setTextFilter('ffe'));
//store.dispatch(setTextFilter());

store.dispatch(sortByAmount());// amount
// store.dispatch(sortByDate());//date

//store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());
//store.dispatch(setEndDate(1000));

const demoState = {
    expenses: [{
        id: 'sdfsdf',
        description: 'January rent',
        note: 'This was the final payment',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount',//date or amount
        startDate: undefined,
        endDate: undefined
    }
};

// const user = {
//     name: 'Jen',
//     age: 24
// }

// console.log({
//     ...user, 
//     location: 'Philadekphioa',
//     age: 27
// });