import { addExpense, editExpense, removeExpense } from "../../actions/expenses";

describe('removeExpense', () => {
    it('should set up remove expense action object', () => {
        const action = removeExpense({ id: 'test-id'});
        expect(action).toEqual({
            type: 'REMOVE_EXPENSE',
            id: 'test-id'
        })
    });
});

describe('editExpense', () => {
    it('should set up edit expense action object', () => {
        const updates = {
            description: 'new-description'
        }
        const action = editExpense('test-id', updates);
        expect(action).toEqual({
            type: 'EDIT_EXPENSE',
            id: 'test-id',
            updates
        })
    });
});

describe('addExpense', () => {
    it('should set up add expense action object', () => {
        const expense = {
            description: 'test-description',
            amount: 1000,
            createdAt: 500,
            note: 'test-note'
        }
        const action = addExpense(expense);
        expect(action).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expense
            }
        })
    });
    it('should set up add expense action object with default values', () => {
        const action = addExpense();
        expect(action).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                description: '',
                amount: 0,
                createdAt: 0,
                note: ''
            }
        });
    })
});