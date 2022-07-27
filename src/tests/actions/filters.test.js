import { setStartDate, setEndDate, sortByDate, sortByAmount, setTextFilter } from "../../actions/filters";
import moment from "moment";

describe('setStartDate', () => {
    it('should generate set start date action object', () => {
        const action = setStartDate(moment(0));
        expect(action).toEqual({
            type: 'SET_START_DATE',
            date: moment(0)
        });
    });
});

describe('setEndDate', () => {
    it('should generate set end date action object', () => {
        const action = setEndDate(moment(0));
        expect(action).toEqual({
            type: 'SET_END_DATE',
            date: moment(0)
        });
    });
});

describe('sortByDate', () => {
    it('should generate sort by date action object', () => {
        const action = sortByDate();
        expect(action).toEqual({
            type: 'SORT_BY_DATE'
        });
    });
})

describe('sortByAmount', () => {
    it('should generate sort by amount action object', () => {
        const action = sortByAmount();
        expect(action).toEqual({
            type: 'SORT_BY_AMOUNT'
        });
    });
})

describe('setTextFilter', () => {
    it('should generate set text filter action object', () => {
        const action = setTextFilter('test');
        expect(action).toEqual({
            type: 'SET_TEXT_FILTER',
            text: 'test'
        });
    });

    it('should generate default set text filter action object', () => {
        const action = setTextFilter();
        expect(action).toEqual({
            type: 'SET_TEXT_FILTER',
            text: ''
        });
    });
})