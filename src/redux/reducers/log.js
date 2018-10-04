import Action from '../ActionType';
import { ConnectionResult } from './../FilterTypes';
import { filterLogs, daysInMilliseconds, sha256 } from '../utils';

const now = new Date().getTime();

const initialState = {
    isFetching: false,
    error: undefined,
    logs: [],
    filteredLogs: [],
    filteredConnectionResults: [],
    connectionResultFilter: ConnectionResult.NONE,
    dateRange: {
        from: now - daysInMilliseconds(30),
        to: now
    }
};

const filterByConnectionResult = (logs, filter) => {
    if (filter === ConnectionResult.NONE) {
        return logs;
    }
    return logs.filter((log) => {
        const isSuccess = log.is_direct_successful || log.utp_hole_punch_result.hasOwnProperty('Succeeded') || log.tcp_hole_punch_result.hasOwnProperty('Succeeded');
        return filter === ConnectionResult.SUCCESS ? isSuccess : !isSuccess;
    });
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
                    logs,
                    filteredLogs,
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
                filteredConnectionResults: filterByConnectionResult(logsByRange, ConnectionResult.NONE)
            };
            break;
        case Action.FILTER_NONE:
            state = {
                ...state,
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
