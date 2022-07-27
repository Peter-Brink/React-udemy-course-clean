import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses'

describe('EditExpensePage', () => {

    let editExpense, removeExpense, history, wrapper;

    beforeEach(() => {
        editExpense = jest.fn();
        removeExpense = jest.fn();
        history = { push: jest.fn() }
        wrapper = shallow(<EditExpensePage editExpense={editExpense} removeExpense={removeExpense} history={history} expense={expenses[2]} />)
    })

    it('should render EditExpensePage correctly', () => {
        expect(wrapper).toMatchSnapshot();
    })
    it('should handle onSubmit', () => {
        wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);

        expect(history.push).toHaveBeenLastCalledWith('/');
        expect(editExpense).toHaveBeenLastCalledWith(expenses[2].id, expenses[1]);
    })
    it('should handle removeExpense', () => {
        wrapper.find('button').simulate('click');

        expect(history.push).toHaveBeenLastCalledWith('/');
        expect(removeExpense).toHaveBeenLastCalledWith({ id: expenses[2].id });
    })
})