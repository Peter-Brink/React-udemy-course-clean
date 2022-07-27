import moment from 'moment';
import { expensesReducer } from '../../reducers/expenses';
import expenses from '../fixtures/expenses'

describe('expensesReducer', () => {

    it('should set default state', () => {
        const state = expensesReducer(undefined, { type: '@@INIT'});
        expect(state).toEqual([]);
    })
    
    it('should remove expense by id', () => {
        const state = expensesReducer(expenses, { type: 'REMOVE_EXPENSE', id: expenses[1].id })

        expect(state).toEqual([ expenses[0], expenses[2] ]);
    })

    it('should not remove expense by id id id not found', () => {
        const state = expensesReducer(expenses, { type: 'REMOVE_EXPENSE', id: '-1' })

        expect(state).toEqual(expenses);
    })

    it('should add an expense', () => {

        const action = {
            type: 'ADD_EXPENSE',
            expense: {
                id: '3',
                description: 'test',
                note: '',
                amount: 3000,
                createdAt: moment(0).add(5, 'day').valueOf()
            }
        }

        const state = expensesReducer(expenses, action);

        expect(state).toEqual([...expenses, action.expense ]);
    })

    it('should edit an expense', () => {

        const amount = 150000;

        const action = {
            type: 'EDIT_EXPENSE',
            id: expenses[1].id,
            updates: {
                amount
            }
        }

        const state = expensesReducer(expenses, action);

        expect(state[1].amount).toBe(amount);
    })

    it('should not edit an expense if expense not found', () => {

        const action = {
            type: 'EDIT_EXPENSE',
            id: '-1',
            updates: {
                amount: 150000
            }
        }

        const state = expensesReducer(expenses, action);

        expect(state).toEqual(expenses);
    })

})