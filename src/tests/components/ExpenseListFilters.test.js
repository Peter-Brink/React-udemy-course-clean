import React from "react";
import { shallow } from "enzyme";
import { ExpenseListFilters} from "../../components/ExpenseListFilters";
import { filters, altFilters } from "../fixtures/filters";

describe('ExpenseListFilters', () => {
    
    let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

    beforeEach(() => {
        setTextFilter = jest.fn();
        sortByDate = jest.fn();
        sortByAmount = jest.fn();
        setStartDate = jest.fn();
        setEndDate = jest.fn();

        wrapper = shallow(
            <ExpenseListFilters 
                filters={filters}
                setTextFilter={setTextFilter}
                sortByDate={sortByDate}
                sortByAmount={sortByAmount}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
            />
        )
    });

    it('should render properly', () => {
        expect(wrapper).toMatchSnapshot();
    })
    it('should render with alt data', () => {
        wrapper.setProps({
            filters: altFilters
        })
        expect(wrapper).toMatchSnapshot();
    })
    it('should handle text change', () => {
        wrapper.find('input').simulate('change', {
            target: {
                value: 'test'
            }
        })

        expect(setTextFilter).toHaveBeenLastCalledWith('test');
    })
    it('should sort by date', () => {

        wrapper.setProps({ filters: altFilters })

        wrapper.find('select').simulate('change', {
            target: {
                value: 'date'
            }
        })

        expect(sortByDate).toHaveBeenCalled();
    })
    it('should sort by amount', () => {

        wrapper.find('select').simulate('change', {
            target: {
                value: 'amount'
            }
        })

        expect(sortByAmount).toHaveBeenCalled();
    })
    it('should handle date changes', () => {

        const startDate = altFilters.startDate;
        const endDate = altFilters.endDate;

        wrapper.find('DateRangePicker').prop('onDatesChange')({ startDate, endDate });

        expect(setStartDate).toHaveBeenLastCalledWith(startDate);
        expect(setEndDate).toHaveBeenLastCalledWith(endDate);
    })
    it('should handle date focus change', () => {

        const calendarFocused = 'endDate';

        wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);

        expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
    })
});