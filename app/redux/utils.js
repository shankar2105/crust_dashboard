import { NatType, OS, PROTOCOL } from './FilterTypes';

export const hoursInMilliseconds = (HOURS) => 1 * 1000 * 60 * 60 * HOURS;
export const daysInMilliseconds = (DAYS) => hoursInMilliseconds(24) * DAYS;

export const prepareLogs = (logs) => {
    const osCountMap = {};
    const countryCountMap = {};
    const successfulConnections = [];
    const failedConnections = [];
    let from = new Date;
    logs.forEach(log => {
        const isSuccess = log.is_direct_successful || log.utp_hole_punch_result.hasOwnProperty('Succeeded') || log.tcp_hole_punch_result.hasOwnProperty('Succeeded');
        log.isSuccessful = isSuccess; 
        if (!osCountMap[log.peer_requester.os]) {
            osCountMap[log.peer_requester.os] = 0;
        }
        if (!osCountMap[log.peer_responder.os]) {
            osCountMap[log.peer_responder.os] = 0;
        }
        osCountMap[log.peer_requester.os] = osCountMap[log.peer_requester.os] + 1;
        osCountMap[log.peer_responder.os] = osCountMap[log.peer_responder.os] + 1; 
        if (!countryCountMap[log.peer_requester.geo_info.country_name]) {
            countryCountMap[log.peer_requester.geo_info.country_name] = 0;
        }
        if (!countryCountMap[log.peer_responder.geo_info.country_name]) {
            countryCountMap[log.peer_responder.geo_info.country_name] = 0;
        }
        countryCountMap[log.peer_requester.geo_info.country_name] = countryCountMap[log.peer_requester.geo_info.country_name] + 1;
        countryCountMap[log.peer_responder.geo_info.country_name] = countryCountMap[log.peer_responder.geo_info.country_name] + 1;
        if (from > new Date(log.createdAt)) {
            from = new Date(log.createdAt);
        }
        if (typeof(log.peer_requester.nat_type) !== 'string') {
            log.peer_requester.nat_type = 'EDM_RANDOM'
        }
        if (typeof(log.peer_responder.nat_type) !== 'string') {
            log.peer_responder.nat_type = 'EDM_RANDOM'
        }
        (isSuccess ? successfulConnections : failedConnections).push(log);
    });
    return {
        logs,
        osCountMap,
        countryCountMap,
        successfulConnections,
        failedConnections,
        dateRange: {
            from,
            to: new Date
        }
    };
};


/**
 * 
 * @param {*} logs 
 * @param {*} from - local date 
 * @param {*} to - local date
 */
export const filterLogs = (logs, from, to) => {
    const filteredLogs = logs.filter(log => {
        log.createdAt = new Date(log.createdAt);
        return log.createdAt >= from && log.createdAt <= to;
    });
    return prepareLogs(filteredLogs);
};

export const applyFilter = (logs, filter) => {
        const isNatTypeMatching = () => {
            var temp= logs.filter(log => {
            if (filter.NatType1 === NatType.ANY && filter.NatType2 === NatType.ANY){
                return true
            }
            else if ((filter.NatType1 === NatType.ANY && filter.NatType2 !== NatType.ANY)){
                return (filter.NatType2 === log.peer_requester.nat_type || filter.NatType2 === log.peer_responder.nat_type)
            }
            else if (filter.NatType2 === NatType.ANY && filter.NatType1 !== NatType.ANY){
                return (filter.NatType1 === log.peer_requester.nat_type || filter.NatType1 === log.peer_responder.nat_type)
            }
            else if (filter.NatType1 !== NatType.ANY && filter.NatType2 !== NatType.ANY) {
                return (log.peer_requester.nat_type === filter.NatType1 && log.peer_responder.nat_type === filter.NatType2) ||
                    (log.peer_requester.nat_type === filter.NatType2 && log.peer_responder.nat_type === filter.NatType1)
            }
        }) 
        return temp;
        }
        const isOSMatching = () => {
            var temp= logs.filter(log => {
            if (filter.OSType1 === OS.ANY && filter.OSType2 === OS.ANY)
                return true;
            else if ((filter.OSType1 === OS.ANY && filter.OSType2 !== OS.ANY))
                return (filter.OSType2 === log.peer_requester.os || filter.OSType2 === log.peer_responder.os)
            else if ((filter.OSType2 === OS.ANY && filter.OSType1 !== OS.ANY))
                return (filter.OSType1 === log.peer_requester.os || filter.OSType1 === log.peer_responder.os)
            else if (filter.OSType1 !== OS.ANY && filter.OSType2 !== OS.ANY) {
                return (log.peer_requester.os === filter.OSType1 && log.peer_responder.os === filter.OSType2) ||
                    (log.peer_requester.os === filter.OSType2 && log.peer_responder.os === filter.OSType1)
            }
        })
        return temp;
        }

        const isProtocolMatching = () => {
            var temp= logs.filter(log => {
            if (filter.Protocol === PROTOCOL.ANY) {
                return true;
            }
            return (filter.Protocol === PROTOCOL.TCP_DIRECT && log.is_direct_successful) ||
                (filter.Protocol === PROTOCOL.TCP_HP && log.tcp_hole_punch_result.hasOwnProperty('Succeeded')) ||
                (filter.Protocol === PROTOCOL.UTP_HP && log.utp_hole_punch_result.hasOwnProperty('Succeeded'));
            })
            return temp;
            }

        const isCountryMatching = () => {
            const ANY = OS.ANY;
            var temp= logs.filter(log => {
            if (filter.CountryType1 === ANY && filter.CountryType2 === ANY)
                return true;
            else if ((filter.CountryType1 === ANY && filter.CountryType2 !== ANY))
                return (filter.CountryType2 === log.peer_requester.geo_info.country || filter.CountryType2 === log.peer_responder.geo_info.country)
            else if ((filter.CountryType2 === ANY && filter.CountryType1 !== ANY))
                return (filter.CountryType1 === log.peer_requester.geo_info.country || filter.CountryType1 === log.peer_responder.geo_info.country)
            else if (filter.CountryType1 !== ANY && filter.CountryType2 !== ANY) {
                return (log.peer_requester.geo_info.country === filter.CountryType1 && log.peer_responder.geo_info.country === filter.CountryType2) ||
                    (log.peer_requester.geo_info.country === filter.CountryType2 && log.peer_responder.geo_info.country === filter.CountryType1)
            }
        })
        return temp;    
        }

        return isNatTypeMatching() && isOSMatching() && isProtocolMatching() && isCountryMatching();
};
