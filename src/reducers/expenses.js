

//expenses Reducer
const expensesReducerDefaultState = [];

export default (state = expensesReducerDefaultState, action) => {
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
        case 'SET_EXPENSES':
            return action.expenses;
        default:
            return state;
    }
};