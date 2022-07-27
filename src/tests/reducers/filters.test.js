import moment from "moment";
import { filtersReducer } from "../../reducers/filters";

describe('filters reducer', () => {
    it('should set up defaults correctly', () => {
        const state = filtersReducer(undefined, { type: '@@INIT'});

        expect(state).toEqual({
            text: '',
            sortBy: 'date',
            startDate: moment().startOf('month'),
            endDate: moment().endOf('month')
        })
    })

    it('should set sortBy to amount', () => {
        const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });

        expect(state.sortBy).toBe('amount');
    })

    it('should set sortBy to date', () => {
        const defaultState = {
            text: '',
            sortBy: 'amount',
            startDate: undefined,
            endDate: undefined
        }
        const state = filtersReducer(defaultState, { type: 'SORT_BY_DATE'});

        expect(state.sortBy).toBe('date');
    })

    it('should set text filter', () => {
        const state = filtersReducer(undefined, { type: 'SET_TEXT_FILTER', text: 'test'})

        expect(state.text).toBe('test');
    })
    
    it('should set startDate filter', () => {
        const state = filtersReducer(undefined, { type: 'SET_START_DATE', date: moment(1000)})

        expect(state.startDate).toEqual(moment(1000));
    })

    it('should set endDate filter', () => {
        const state = filtersReducer(undefined, { type: 'SET_END_DATE', date: moment(1500)})

        expect(state.endDate).toEqual(moment(1500));
    })
})