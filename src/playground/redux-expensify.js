import { createStore, combineReducers } from 'redux';
import uuid from 'uuid'

const addExpense = ({ description = '', note = '', amount = 0, createdAt = 0} = {}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
});

const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
})

const editExpense = ( { id, updates } ) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
})

const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
})

const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT'
})

const sortByDate = () => ({
  type: 'SORT_BY_DATE'
})

const setStartDate = (date) => ({
  type: 'SET_START_DATE',
  date
})

const setEndDate = (date) => ({
  type: 'SET_END_DATE',
  date
})

const expensesReducerDefaultState = []

const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
}

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE': {
      return [
        ...state, 
        action.expense
      ]
    }
    case 'REMOVE_EXPENSE': {
      return state.filter((exp) => exp.id !== action.id)
    }
    case 'EDIT_EXPENSE': {
      return state.map((exp) => {
        if(exp.id === action.id){
          return {
            ...exp,
            ...action.updates
          }
        }
      });
    }
    default:
      return state
  }
}

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return { ...state, text: action.text }
    case 'SORT_BY_AMOUNT':
      return { ...state, sortBy: 'amount'}
    case 'SORT_BY_DATE':
      return { ...state, sortBy: 'date'}
    case 'SET_START_DATE':
        return { ...state, startDate: action.date }
    case 'SET_END_DATE':
        return { ...state, endDate: action.date }
    default:
      return state
  }
}

// get visible expenses

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {

  return expenses.filter((expense) => {
    const startdateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;;
    const textMatch = typeof text !== 'string' || expense.description.toLowerCase().includes(text.toLowerCase());

    return startdateMatch && endDateMatch && textMatch
  }).sort((a, b) => {
    if(sortBy === 'date'){
      return a.createdAt < b.createdAt ? 1 : -1
    }else if (sortBy === 'amount'){
      return a.amount < b.amount ? 1 : -1
    }
  });
};

const store = createStore(combineReducers({
  expenses: expensesReducer,
  filters: filtersReducer
}));

const unsubscribe = store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({ description: 'rent', amount: 100, createdAt: 300 }));
const expenseTwo = store.dispatch(addExpense({ description: 'coffee', amount: 300, createdAt: 200 }));

// store.dispatch(removeExpense({ id: expenseOne.expense.id }))

// store.dispatch(editExpense({ id: expenseTwo.expense.id, updates: { amount: 500 } }));

store.dispatch(setTextFilter('rent'));
store.dispatch(setTextFilter())

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

store.dispatch(setStartDate(125));
// store.dispatch(setStartDate());
store.dispatch(setEndDate(1250))

const demoState = {
  expenses: [{
    id: 'poijasdfhwer',
    description: 'January Rent',
    note: 'This was the final payment for that address',
    amount: 54500,
    createdAt: 0
  }],
  filters: {
    text: 'rent',
    sortBy: 'amount', // date or amount
    startDate: undefined,
    endDate: undefined
  }
};

