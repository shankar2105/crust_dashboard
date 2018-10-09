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
        case Action.FILTER_REQUESTER_NAT:
            filter = {
                ...state.filter,
                RequesterNatType: action.payload.natType
            };
            state = {
                ...state,
                filter,
                filteredLogs: applyFilter(action.payload.logs, filter)
            };
            break;
        case Action.FILTER_RESPONDER_NAT:
            state = {
                ...state,
                filter,
                filteredLogs: applyFilter(action.payload.logs, filter)
            };
            break;
        case Action.FILTER_REQUESTER_OS:
            filter = {
                ...state.filter,
                RequesterOS: action.payload.os
            };
            state = {
                ...state,
                filter,
                filteredLogs: applyFilter(action.payload.logs, filter)
            };
            break;
        case Action.FILTER_RESPONDER_OS:
            filter = {
                ...state.filter,
                ResponderOS: action.payload.os
            };
            state = {
                ...state,
                filter,
                filteredLogs: applyFilter(action.payload.logs, filter)
            };
            break;
        case Action.FILTER_REQUESTER_COUNTRY:
            filter = {
                ...state.filter,
                RequesterCountry: action.payload.country
            };
            state = {
                ...state,
                filter,
                filteredLogs: applyFilter(action.payload.logs, filter)
            };
            break;
        case Action.FILTER_RESPONDER_COUNTRY:
            filter = {
                ...state.filter,
                ResponderCountry: action.payload.country
            };
            state = {
                ...state,
                filter,
                filteredLogs: applyFilter(action.payload.logs, filter)
            };
            break;
        case Action.FILTER_BY_PROTOCOL:
            filter = {
                ...state.filter,
                Protocol: action.payload.protocol
            };
            state = {
                ...state,
                filter,
                filteredLogs: applyFilter(action.payload.logs, filter)
            };
            break;
    }
    return state;
};

export default activityReducer;