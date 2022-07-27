import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { addExpense } from './actions/expenses';
import AppRouter from './routers/AppRouter';
import { getVisibleExpenses } from './selectors/expenses';
import configureStore from './store/configureStore'

const store = configureStore();

store.subscribe(() => {
    const state = store.getState();
    console.log(getVisibleExpenses(state.expenses, state.filters));
});

store.dispatch(addExpense({ description: 'water bill', amount: 500, createdAt: 200}));
store.dispatch(addExpense({ description: 'rent', amount: 109500, createdAt: 1000}));
store.dispatch(addExpense({ description: 'gas bill', amount: 1000 }));

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('app'));
