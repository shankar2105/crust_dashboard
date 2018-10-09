import Action from '../../ActionType';
import { Filter } from '../../FilterTypes';
import { applyFilter } from '../../utils';

const initialState = {
    filteredLogs: [],
    filter: { ...Filter }
};

const activityReducer = (state=initialState, action) => {
    let filter;
    switch (action.type) {
        case `CON_ACT_${Action.REVALIDATE}`:
        state = {
            ...state,
            filteredLogs: applyFilter(action.payload, state.filter)
        };
        break;

        case `CON_ACT_${Action.FILTER_NAT_TYPE1}`:
            filter = {
                ...state.filter,
                NatType1: action.payload
            };
            state = {
                ...state,
                filter,
                filteredLogs: applyFilter(state.filteredLogs, filter)
            };
            break;
            
        case `CON_ACT_${Action.FILTER_NAT_TYPE2}`:
        filter = {
            ...state.filter,
            NatType2: action.payload
        };
        state = {
            ...state,
            filter,
            filteredLogs: applyFilter(state.filteredLogs, filter)
        };
        break;
        case `CON_ACT_${Action.FILTER_OS_TYPE1}`:
            filter = {
                ...state.filter,
                OSType1: action.payload
            };
            state = {
                ...state,
                filter,
                filteredLogs: applyFilter(state.filteredLogs, filter)
            };
            break;
        case `CON_ACT_${Action.FILTER_OS_TYPE2}`:
            filter = {
                ...state.filter,
                OSType2: action.payload
            };
            state = {
                ...state,
                filter,
                filteredLogs: applyFilter(state.filteredLogs, filter)
            };
            break;
        case `CON_ACT_${Action.FILTER_COUNTRY_TYPE1}`:
            filter = {
                ...state.filter,
                CountryType1: action.payload
            };
            state = {
                ...state,
                filter,
                filteredLogs: applyFilter(state.filteredLogs, filter)
            };
            break;
        case `CON_ACT_${Action.FILTER_COUNTRY_TYPE2}`:
            filter = {
                ...state.filter,
                CountryType2: action.payload
            };
            state = {
                ...state,
                filter,
                filteredLogs: applyFilter(state.filteredLogs, filter)
            };
            break;            
        case `CON_ACT_${Action.FILTER_BY_PROTOCOL}`:
            filter = {
                ...state.filter,
                Protocol: action.payload
            };
            state = {
                ...state,
                filter,
                filteredLogs: applyFilter(state.filteredLogs, filter)
            };
            break;
    }
    return state;
};

export default activityReducer;