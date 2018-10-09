import Action from '../ActionType';
import { ConnectionResult, OS, NatType } from './../FilterTypes';
import { filterLogs, daysInMilliseconds, prepareLogs } from '../utils';

const now = new Date().getTime();

const initialState = {
    isFetching: false,
    error: undefined,
    logs: [],
    filteredLogs: {
        logs: [],
        successfulConnections: [],
        failedConnections: [],
        osList: Object.keys(OS),
        natTypes: Object.keys(NatType),
        osCount: {},
        countriesCount: {}
    },
    paging: {},
    filteredConnectionResults: {
        logs: [],
        successfulConnections: [],
        failedConnections: [],
        osList: Object.keys(OS),
        natTypes: Object.keys(NatType),
        osCount: {},
        countriesCount: {}
    },
    connectionResultFilter: ConnectionResult.NONE,
    dateRange: {
        allTime: {
            from: now - daysInMilliseconds(30),
            to: now
        },
        custom: {
            from: now - daysInMilliseconds(30),
            to: now
        }
    }
};

const filterByConnectionResult = (preparedLogs, filter) => {
    (filter === ConnectionResult.NONE) ? preparedLogs.logs : 
        ((filter === ConnectionResult.SUCCESS) ? preparedLogs.successfulConnections: preparedLogs.failedConnections);
};

const logReducer = (state = initialState, action) => {
    switch (action.type) {
        case `${Action.FETCH_LOGS}_PENDING`:
            state = {
                ...initialState, 
                isFetching: true
            };
            break;
        case `${Action.FETCH_LOGS}_FULFILLED`:
            const hasFailed = action.payload instanceof Error;
            if (hasFailed) {
                state = {
                    ...state,
                    isFetching: false,
                    error: action.payload,
                };
            } else {
                const logs = action.payload;
                const preparedLogs = prepareLogs(logs);
                const filteredLogs = {
                    logs: preparedLogs.logs,
                    successfulConnections: preparedLogs.successfulConnections,
                    failedConnections: preparedLogs.failedConnections,
                    osList: Object.keys(OS),
                    natTypes: Object.keys(NatType),
                    osCount: preparedLogs.osCountMap,
                    countriesCount: preparedLogs.countryCountMap
                };
                state = {
                    ...initialState,
                    isFetching: false,
                    error: undefined,
                    logs: logs,
                    filteredLogs,
                    filteredConnectionResults: filteredLogs.logs,
                    dateRange: {
                        allTime: preparedLogs.dateRange,
                        custom: preparedLogs.dateRange
                    }
                };
            }
            break;
        case Action.FILTER_BY_RANGE:
            const logsByrange = action.payload.from === -1 ? state.logs : filterLogs(state.logs, action.payload.from, action.payload.to);
            const filteredLogs = {
                logs: logsByrange.logs,
                successfulConnections: logsByrange.successfulConnections,
                failedConnections: logsByrange.failedConnections,
                osList: Object.keys(OS),
                natTypes: Object.keys(NatType),
                osCount: logsByrange.osCountMap,
                countriesCount: logsByrange.countryCountMap
            };
            state = {
                ...state,
                dateRange: {
                    ...state.dateRange,
                    custom: {from: action.payload.from, to: action.payload.to}
                },
                filteredLogs: filteredLogs,
                filteredConnectionResults: filterByConnectionResult(filteredLogs, state.connectionResultFilter)
            };
            break;
        case Action.FILTER_NONE:
            state = {
                ...state,
                connectionResultFilter: ConnectionResult.NONE, 
                filteredConnectionResults: state.filteredLogs.logs
            };
            break;
        case Action.FILTER_SUCCESS:
            state = {
                ...state,
                connectionResultFilter: ConnectionResult.SUCCESS, 
                filteredConnectionResults: state.filteredLogs.successfulConnections
            };
            break;
        case Action.FILTER_FAILURE:
            state = {
                ...state,
                connectionResultFilter: ConnectionResult.FAILURE,
                filteredConnectionResults: state.filteredLogs.failedConnections
            };
            break;
    }
    return state;
};

export default logReducer;
