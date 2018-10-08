import Action from '../ActionType';
import { ConnectionResult, OS } from './../FilterTypes';
import { filterLogs, daysInMilliseconds, sha256 } from '../utils';

const now = new Date().getTime();

const initialState = {
    isFetching: false,
    error: undefined,
    logs: [],
    filteredLogs: [],
    filteredConnectionResults: {
        logs: [],
        osList: Object.keys(OS),
        countries: []
    },
    connectionResultFilter: ConnectionResult.NONE,
    dateRange: {
        from: now - daysInMilliseconds(30),
        to: now
    }
};

const filterByConnectionResult = (logs, filter) => {
    const countries = [];
    const filteredLogs = logs.filter((log) => {
        if (countries.indexOf(log.peer_requester.geo_info.country_name) === -1) {
            countries.push(log.peer_requester.geo_info.country_name)
        }
        if (countries.indexOf(log.peer_responder.geo_info.country_name) === -1) {
            countries.push(log.peer_responder.geo_info.country_name)
        }
        const isSuccess = log.is_direct_successful || log.utp_hole_punch_result.hasOwnProperty('Succeeded') || log.tcp_hole_punch_result.hasOwnProperty('Succeeded');
        return filter === ConnectionResult.SUCCESS ? isSuccess : !isSuccess;
    });
    return {
        countries,
        osList: Object.keys(OS),
        logs: filteredLogs
    }
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
                logs.forEach(async (log) => {
                    const hash = await sha256(log);
                    log.id = hash;
                    log.isSuccessful = (log.is_direct_successful || log.utp_hole_punch_result.hasOwnProperty('Succeeded') || log.tcp_hole_punch_result.hasOwnProperty('Succeeded'));
                });
                const filteredLogs = filterLogs(logs, state.dateRange.from, state.dateRange.to);
                state = {
                    ...initialState,
                    isFetching: false,
                    error: undefined,
                    logs: logs,
                    filteredLogs: filteredLogs,
                    filteredConnectionResults: filteredLogs
                };
            }
            break;
        case Action.FILTER_BY_RANGE:
            const logsByRange = action.payload.from === -1 ? state.logs : filterLogs(state.logs, action.payload.from, action.payload.to);
            state = {
                ...state,
                dateRange: {from: action.payload.from, to: action.payload.to},
                filteredLogs: logsByRange,
                filteredConnectionResults: filterByConnectionResult(logsByRange, state.connectionResultFilter)
            };
            break;
        case Action.FILTER_NONE:
            state = {
                ...state,
                connectionResultFilter: ConnectionResult.NONE, 
                filteredConnectionResults: state.filteredLogs
            };
            break;
        case Action.FILTER_SUCCESS:
            state = {
                ...state,
                connectionResultFilter: ConnectionResult.SUCCESS, 
                filteredConnectionResults: filterByConnectionResult(state.filteredLogs, ConnectionResult.SUCCESS)
            };
            break;
        case Action.FILTER_FAILURE:
            state = {
                ...state,
                connectionResultFilter: ConnectionResult.FAILURE,
                filteredConnectionResults: filterByConnectionResult(state.filteredLogs, ConnectionResult.FAILURE)
            };
            break;
    }
    return state;
};

export default logReducer;
