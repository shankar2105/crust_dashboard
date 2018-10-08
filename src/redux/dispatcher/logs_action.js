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

export const revalidate = (mod,logs) => {
    return {
        //type:  `${mod}_${Action.REVALIDATE}`, //this does not work for some reason, maybe wrong format mod parameter sent here
        type:   `CON_ACT_${Action.REVALIDATE}`, //this works
        payload: logs
    }
}

export const filterChange = (mod, action, filter) => {
    return {
        //type: `${mod}_${action}`,  //check this also
        payload: filter
    }
}
