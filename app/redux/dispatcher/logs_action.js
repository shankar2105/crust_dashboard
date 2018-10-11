import Action from '../ActionType';
import { applyFilter } from '../utils';

const BASE_URL = `http://localhost:8080/logs/#api`;
const PROGRESS_COMPLETED_TIMEOUT = 1000;

const fetchAllLogs = (dispatcher) => {
    let result = [];
    const fetchData = (from, limit = 100) => {
        return new Promise(async (resolve, reject) => {
            try {
                const dataFetched = await fetch(`${BASE_URL}/stats?pageNo=${from}&size=${limit}`);
                const jsonData = await dataFetched.json();
                result = result.concat(jsonData);//.logs);
                jsonData.totalPages=1;//remove
                const donePercentage = Math.ceil(from / (jsonData.totalPages) * 100)
                console.log('result', jsonData.totalPages, from, limit, result.length, `${donePercentage}%`)
                dispatcher({
                    type: `${Action.FETCH_LOGS}_FULFILLED`,
                    payload: {
                        logs: result,
                        done: donePercentage
                    }
                });
                if (from !== jsonData.totalPages) {
                    return await fetchData(from + 1);
                }
                return resolve();
            } catch (err) {
                return reject(err);
            }
        });
    };
     return new Promise(async (resolve, reject) => {
        dispatcher({
            type: `${Action.FETCH_LOGS}_PENDING`
        });
        try {
            await fetchData(1);
            const timeout = setTimeout(() => {
                dispatcher({
                    type: Action.PROGRESS_COMPLETED
                });
                clearTimeout(timeout);
            }, PROGRESS_COMPLETED_TIMEOUT);
            return resolve(result);
        } catch(e) {
            dispatcher({
                type: Action.ERROR,
                payload: 'Failed to get initial data from Server'
            });
            reject(e);
        }
    });
}
 export const fetchLogs = () => {
    return (dispatcher) => {
        return fetchAllLogs(dispatcher);
    }
}

export const filterByConnectionResult = (action) => {
    return {
        type: action
    }
}

export const revalidate = (logs, filter) => {
    return {
        type: Action.REVALIDATE,
        payload: new Promise((resolve) => {
            resolve(applyFilter(logs, filter))
        })
    }
}

export const filterChange = (data, mod, action, value) => {
    return {
        type:  `${mod}_${action}`,
        payload: value,
        data: data
    }
}
