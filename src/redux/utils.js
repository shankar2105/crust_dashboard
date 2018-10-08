import { NatType, OS, PROTOCOL } from './FilterTypes';


const hex = (buffer) => {
    var hexCodes = [];
    var view = new DataView(buffer);
    for (var i = 0; i < view.byteLength; i += 4) {
        // Using getUint32 reduces the number of iterations needed (we process 4 bytes each time)
        var value = view.getUint32(i)
        // toString(16) will give the hex representation of the number without padding
        var stringValue = value.toString(16)
        // We use concatenation and slice for padding
        var padding = '00000000'
        var paddedValue = (padding + stringValue).slice(-padding.length)
        hexCodes.push(paddedValue);
    }

    // Join all the hex strings into one
    return hexCodes.join("");
};

export const hoursInMilliseconds = (HOURS) => 1 * 1000 * 60 * 60 * HOURS;
export const daysInMilliseconds = (DAYS) => hoursInMilliseconds(24) * DAYS;

export const sha256 = (log) => {
    var buffer = new TextEncoder("utf-8").encode(JSON.stringify(log));
    return crypto.subtle.digest("SHA-256", buffer).then(hash => hex(hash));
};


/**
 * 
 * @param {*} logs 
 * @param {*} from - local date 
 * @param {*} to - local date
 */
export const filterLogs = (logs, from, to) => logs.filter(log => {
    log.createdAt = new Date(log.createdAt);
    return log.createdAt >= from && log.createdAt <= to;
});

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

export const computeStats = (logs, filter) => {
    // TODO
    return {
        dashboard: {
            totalNat: {}
        }
    }
};