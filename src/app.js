import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { addExpense } from './actions/expenses';
import AppRouter from './routers/AppRouter';
import { getVisibleExpenses } from './selectors/expenses';
import configureStore from './store/configureStore'

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('app'));
