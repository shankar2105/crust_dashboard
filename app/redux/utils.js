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
    console.log(logs);
    return logs.filter(log => {
        const isNatTypeMatching = () => {
            if (filter.RequesterNatType === NatType.ANY && filter.ResponderNatType === NatType.ANY) {
                return true;
            }
            return (filter.RequesterNatType !== NatType.ANY && log.peer_requester.nat_type === filter.RequesterNatType) ||
            (filter.ResponderNatType !== NatType.ANY && log.peer_responder.nat_type === filter.ResponderNatType);
        };
        const isOSMatching = () => {
            if (filter.RequesterOS === OS.ANY && filter.ResponderOS === OS.ANY) {
                return true;
            }
            return (filter.RequesterOS !== OS.ANY && log.peer_requester.os === filter.RequesterOS) ||
            (filter.ResponderOS !== OS.ANY && log.peer_responder.os === filter.ResponderOS);
        };
        const isProtocolMatching = () => {
            if (filter.Protocol === PROTOCOL.ANY) {
                return true;
            }
            return (filter.Protocol === PROTOCOL.TCP_DIRECT && log.is_direct_successful) ||
                (filter.Protocol === PROTOCOL.TCP_HP && log.tcp_hole_punch_result.hasOwnProperty('Succeeded')) ||
                (filter.Protocol === PROTOCOL.UTP_HP && log.utp_hole_punch_result.hasOwnProperty('Succeeded'));
        };
        
        const isCountryMatching = () => {
            const ANY = OS.ANY;
            if (filter.RequesterCountry === ANY && filter.ResponderCountry === ANY) {
                return true;
            }
            return (filter.RequesterCountry !== ANY && log.peer_requester.geo_info.country === filter.RequesterCountry) ||
            (filter.ResponderCountry !== ANY && log.peer_responder.geo_info.country === filter.ResponderCountry);
        };
        return isNatTypeMatching() && isOSMatching() && isProtocolMatching() && isCountryMatching();
    });
};

export const computeStats = (logs, filter) => {
    // TODO
    return {
        dashboard: {
            totalNat: {}
        }
    }
};