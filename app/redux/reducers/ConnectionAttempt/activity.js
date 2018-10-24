import Action from '../../ActionType';
import { Filter } from '../../FilterTypes';

export const MOD_NAME = 'CON_ACT';

const initialState = {
    filteredLogs: [],
    isComputing: false,
    successfulConnections: [],
    failedConnections: [],
    tcpHpCount: 0,
    directCount: 0,
    udpHpCount: 0,
    filter: { ...Filter }
};

const activityReducer = (state=initialState, action) => {
    let filter;
    switch (action.type) {
        case `${Action.REVALIDATE}_PENDING`:
            state = {
                ...state,
                isComputing: true,
                filteredLogs: []
            };
            break;
        case `${Action.REVALIDATE}_FULFILLED`:
            state = {
                ...state,
                isComputing: false,
                filteredLogs: action.payload
            };
            break;

        case `${MOD_NAME}_${Action.FILTER_NAT_TYPE1}`:
            filter = {
                ...state.filter,
                NatType1: action.payload
            };
            state = {
                ...state,
                filter
            };
            break;
            
        case `${MOD_NAME}_${Action.FILTER_NAT_TYPE2}`:
            filter = {
                ...state.filter,
                NatType2: action.payload
            };
            state = {
                ...state,
                filter
            };
            break;
        case `${MOD_NAME}_${Action.FILTER_OS_TYPE1}`:
            filter = {
                ...state.filter,
                OSType1: action.payload
            };
            state = {
                ...state,
                filter
            };
            break;
        case `${MOD_NAME}_${Action.FILTER_OS_TYPE2}`:
            filter = {
                ...state.filter,
                OSType2: action.payload
            };
            state = {
                ...state,
                filter
            };
            break;
        case `${MOD_NAME}_${Action.FILTER_COUNTRY_TYPE1}`:
            filter = {
                ...state.filter,
                CountryType1: action.payload
            };
            state = {
                ...state,
                filter
            };
            break;
        case `${MOD_NAME}_${Action.FILTER_COUNTRY_TYPE2}`:
            filter = {
                ...state.filter,
                CountryType2: action.payload
            };
            state = {
                ...state,
                filter
            };
            break;            
        case `${MOD_NAME}_${Action.FILTER_BY_PROTOCOL}`:
            filter = {
                ...state.filter,
                Protocol: action.payload
            };
            state = {
                ...state,
                filter
            };
            break;
    }
    return state;
};

export default activityReducer;