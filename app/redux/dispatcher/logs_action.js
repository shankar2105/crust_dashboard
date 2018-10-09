import Action from '../ActionType'; 

export const fetchLogs = (from, to) => {
    return {
        type: Action.FETCH_LOGS,
        payload: fetch(`http://localhost:8080/logs?from=${from}&to=${to}`).then(res=> res.status === 200 ? res.json() : new Error(res.status))
    }
}

export const filterByRange = (from, to) => {
    return {
        type: Action.FILTER_BY_RANGE,
        payload: {from , to}
    }
}

export const filterByConnectionResult = (action) => {
    return {
        type: action
    }
}
