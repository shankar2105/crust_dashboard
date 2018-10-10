import Action from '../ActionType';
import { MOD_NAME } from '../reducers/ConnectionAttempt/activity';

const BASE_URL = `http://localhost:3000/api`;
const PROGRESS_COMPLETED_TIMEOUT = 1000;

const fetchAllLogs = (dispatcher) => {
    let result = [];
     const fetchData = async(from, limit = 10) => {
        try {
            const dataFetched = await fetch(`${BASE_URL}/stats?pageNo=${from}&size=${limit}`);
            const jsonData = await dataFetched.json();
            result = result.concat(jsonData.logs);
            const donePercentage = Math.ceil(result.length / (jsonData.totalPages * 10) * 100)
            console.log('result', jsonData, from, limit, result.length, `${donePercentage}%`)
            dispatcher({
                type: `${Action.FETCH_LOGS}_FULFILLED`,
                payload: {
                    logs: result,
                    done: donePercentage
                }
            });
            if (from !== jsonData.totalPages) {
                await fetchData(from + 1);
            }
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    };
     return new Promise(async (resolve, reject) => {
        dispatcher({
            type: `${Action.FETCH_LOGS}_PENDING`
        });
        await fetchData(1);
         // Dispatch progress complete action
        const timer = setTimeout(() => {
            dispatcher({
                type: Action.PROGRESS_COMPLETED
            })
            clearTimeout(timer);
        }, PROGRESS_COMPLETED_TIMEOUT);
         return resolve();
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

export const revalidate = (logs) => {
    return {
        type: Action.REVALIDATE,
        payload: logs
    }
}

export const filterChange = (data, mod, action, value) => {
    return {
        type:  `${mod}_${action}`,
        payload: value,
        data: data
    }
}
