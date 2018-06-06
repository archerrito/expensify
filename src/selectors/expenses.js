import moment from "moment";

//Get Visible expenses
export default (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense)=> {
        //checks if start date is not a number, true, won't filter
        //if is then checks if greater than start date, so filters out
        const createdAtMoment = moment(expense.createdAt);
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day'): true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day'): true;
        // //Pre-moment
        // const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        // const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
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