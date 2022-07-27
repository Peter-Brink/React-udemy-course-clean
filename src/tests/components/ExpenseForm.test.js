import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm'
import expenses from '../fixtures/expenses'
import moment from 'moment';

describe('ExpenseForm', () => {
    it('should render ExpenseForm correctly', () => {
        const wrapper = shallow(<ExpenseForm />);
        expect(wrapper).toMatchSnapshot();
    })
    it('should render ExpenseForm with expense data', () => {
        const wrapper = shallow(<ExpenseForm {...expenses[0]}/>);
        expect(wrapper).toMatchSnapshot();
    })
    it('should render error for incalid form submission', () => {
        const wrapper = shallow(<ExpenseForm />);
        
        expect(wrapper).toMatchSnapshot();
        
        wrapper.find('form').simulate('submit', {
            preventDefault: () => {}
        });
        
        expect(wrapper.state('error').length).toBeGreaterThan(0);
        expect(wrapper).toMatchSnapshot();
    })
    it('should set description on input change', () => {
        const wrapper = shallow(<ExpenseForm />);
        const value = 'new description'
        
        wrapper.find('input').at(0).simulate('change', {
            target: {
                value
            }
        })

        expect(wrapper.state('description')).toBe(value);
    })
    it('should set note on text area change', () => {
        const wrapper = shallow(<ExpenseForm />);
        const value = 'new note'
        
        wrapper.find('textarea').at(0).simulate('change', {
            target: {
                value
            }
        })

        expect(wrapper.state('note')).toBe(value);
    })
    it('should call onSubmit prop for valid form submission', () => {
        const onSubmitSpy = jest.fn();
        const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>);
        
        wrapper.find('form').simulate('submit', {
            preventDefault: () => {}
        });

        expect(wrapper.state('error')).toEqual('');
        expect(onSubmitSpy).toHaveBeenLastCalledWith({
            description: expenses[0].description,
            amount: expenses[0].amount,
            note: expenses[0].note,
            createdAt: expenses[0].createdAt
        });
    })
    it('should set new date on date change', () => {
        const now = moment();
        const wrapper = shallow(<ExpenseForm />);
        wrapper.find('SingleDatePicker').prop('onDateChange')(now)
        expect(wrapper.state('createdAt')).toEqual(now);
    })
    it('should set calendar focus on change', () => {
        const focused = true;
        const wrapper = shallow(<ExpenseForm />);
        wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused });
        expect(wrapper.state('calendarFocused')).toBe(focused);
    })
})