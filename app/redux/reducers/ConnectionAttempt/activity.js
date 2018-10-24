import Action from '../../ActionType';
import { Filter, PROTOCOL } from '../../FilterTypes';

export const MOD_NAME = 'CON_ACT';

const initialState = {
    filteredLogs: [],
    isComputing: false,
    successfulConnections: [],
    failedConnections: [],
    tcpHpCount: 0,
    directCount: 0,
    filter: { ...Filter },
};

const activityReducer = (state = initialState, action) => {
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
                filteredLogs: action.payload.logs,
                tcpHpCount: action.payload.tcpHpCount,
                udpHpCount: action.payload.udpHpCount,
                directCount: action.payload.directCount,
                successfulConnections: action.payload.successfulConnections,
                failedConnections: action.payload.failedConnections
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
        // case `${MOD_NAME}_${Action.FILTER_BY_PROTOCOL}`:
        //     filter = {
        //         ...state.filter,
        //         Protocol: action.payload
        //     };
        //     state = {
        //         ...state,
        //         filter
        //     };
        //     break;
        case `${MOD_NAME}_${Action.FILTER_INCLUDE_PEER_ID}`:
            filter = {
                ...state.filter,
                IncludePeerId: action.payload
            };
            state = {
                ...state,
                filter,
            };
            break;
        case `${MOD_NAME}_${Action.FILTER_EXCLUDE_PEER_ID}`:
            filter = {
                ...state.filter,
                ExcludePeerId: action.payload
            };
            state = {
                ...state,
                filter,
            };
            break;
        case `${MOD_NAME}_${Action.FILTER_PROTOCOL_TCP}`:
            filter = {
                ...state.filter,
                protocolFilter: {
                    ...state.filter.protocolFilter,
                    tcpHp: action.payload
                }
            };
            state = {
                ...state,
                filter,
            };
            break;
        case `${MOD_NAME}_${Action.FILTER_PROTOCOL_UDP}`:
            filter = {
                ...state.filter,
                protocolFilter: {
                    ...state.filter.protocolFilter,
                    udpHp: action.payload
                }
            };
            state = {
                ...state,
                filter,
            };
            break;
        case `${MOD_NAME}_${Action.FILTER_PROTOCOL_DIRECT}`:
            filter = {
                ...state.filter,
                protocolFilter: {
                    ...state.filter.protocolFilter,
                    direct: action.payload
                }
            };
            state = {
                ...state,
                filter,
            };
            break;
    }
    return state;
};

export default activityReducer;