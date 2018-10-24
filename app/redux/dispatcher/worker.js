import Register from 'promise-worker/register';
const customWorker = (msg) => {    
    const NatType = {
        ANY: 'Any',
        EDM: 'EDM',
        EIM: 'EIM'
    }

    const OS = {
        ANY: 'Any',
        Windows: 'Windows',
        OSX: 'MacOS',
        LINUX: 'Linux'
    }

    const PROTOCOL = {
        ANY: 'Any',
        // TCP_DIRECT: 'TCP_DIRECT',
        UDP_HP: 'UDP_HP',
        TCP_HP: 'TCP_HP'
    }

    const tranformOSName = (osName) => {
        switch (osName.toLowerCase()) {
            case 'linux':
                return OS.LINUX;
            case 'macos':
                return OS.OSX;
            case 'windows':
                return OS.Windows;
            default:
                return osName;
        }
    };

    const generatePeerPublicInfo = (name, id) => {
        return name + '(' + id + ')'
    };

    const prepareLogs = (logs) => {
        const osCountMap = {};
        const countryCountMap = {};
        const peerIdMap = [];
        const successfulConnections = [];
        const failedConnections = [];
        let tcpHpCount=0;
        let udpHpCount=0;
        let directCount=0;
        let from = new Date;
    
        logs.forEach((log, i) => {
            log.index = log.index || i+1;
            log.tcp_hole_punch_result === 'Succeeded' ? tcpHpCount++ : null;
            log.udp_hole_punch_result === 'Succeeded' ? udpHpCount++ : null;
            log.is_direct_successful === 'Succeeded' ? directCount++ : null;

            const isSuccess = log.udp_hole_punch_result === 'Succeeded' || log.tcp_hole_punch_result === 'Succeeded' || log.is_direct_successful;
            log.isSuccessful = isSuccess;
    
            const requesterPeerId = generatePeerPublicInfo(log.peer_requester.name, log.peer_requester.id);
            const responderPeerId = generatePeerPublicInfo(log.peer_responder.name, log.peer_responder.id);
            if (!peerIdMap.includes(requesterPeerId)) {
                peerIdMap.push(requesterPeerId);
            }
            if (!peerIdMap.includes(responderPeerId)) {
                peerIdMap.push(responderPeerId)
            }
    
            log.peer_requester.os = tranformOSName(log.peer_requester.os);
            log.peer_responder.os = tranformOSName(log.peer_responder.os);
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
            (isSuccess ? successfulConnections : failedConnections).push(log);
        });
        return {
            logs,
            tcpHpCount,
            udpHpCount,
            directCount,
            osCountMap,
            countryCountMap,
            peerIdMap,
            successfulConnections,
            failedConnections,
            dateRange: {
                from,
                to: new Date
            }
        };
    };

    const applyFilter = (logs, filter) => {
        const isNatTypeMatching = (log) => {
            let matches = false;
            if (filter.NatType1 === NatType.ANY && filter.NatType2 === NatType.ANY) {
                matches = true;
            } else if ((filter.NatType1 === NatType.ANY && filter.NatType2 !== NatType.ANY)) {
                matches = (filter.NatType2 === log.peer_requester.nat_type || filter.NatType2 === log.peer_responder.nat_type)
            } else if (filter.NatType2 === NatType.ANY && filter.NatType1 !== NatType.ANY) {
                matches = (filter.NatType1 === log.peer_requester.nat_type || filter.NatType1 === log.peer_responder.nat_type)
            } else if (filter.NatType1 !== NatType.ANY && filter.NatType2 !== NatType.ANY) {
                matches = (log.peer_requester.nat_type === filter.NatType1 && log.peer_responder.nat_type === filter.NatType2) ||
                    (log.peer_requester.nat_type === filter.NatType2 && log.peer_responder.nat_type === filter.NatType1)
            }
            return matches;
        }
    
        const isOSMatching = (log) => {
            let matches = false;
            if (filter.OSType1 === OS.ANY && filter.OSType2 === OS.ANY)
                matches = true;
            else if ((filter.OSType1 === OS.ANY && filter.OSType2 !== OS.ANY))
                matches = (filter.OSType2 === log.peer_requester.os || filter.OSType2 === log.peer_responder.os)
            else if ((filter.OSType2 === OS.ANY && filter.OSType1 !== OS.ANY))
                matches = (filter.OSType1 === log.peer_requester.os || filter.OSType1 === log.peer_responder.os)
            else if (filter.OSType1 !== OS.ANY && filter.OSType2 !== OS.ANY)
                matches = (log.peer_requester.os === filter.OSType1 && log.peer_responder.os === filter.OSType2) ||
                    (log.peer_requester.os === filter.OSType2 && log.peer_responder.os === filter.OSType1)
            return matches;
        }
    
        const isProtocolMatching = (log) => {
            if (filter.Protocol === PROTOCOL.ANY) {
                return true;
            }
            return (filter.Protocol === PROTOCOL.TCP_DIRECT && log.is_direct_successful) ||
                (filter.Protocol === PROTOCOL.TCP_HP && log.tcp_hole_punch_result === 'Succeeded') ||
                (filter.Protocol === PROTOCOL.UDP_HP && log.udp_hole_punch_result === 'Succeeded');
        }
    
        const isCountryMatching = (log) => {
            const ANY = OS.ANY;
            if (filter.CountryType1 === ANY && filter.CountryType2 === ANY)
                return true;
            else if ((filter.CountryType1 === ANY && filter.CountryType2 !== ANY))
                return (filter.CountryType2 === log.peer_requester.geo_info.country_name || filter.CountryType2 === log.peer_responder.geo_info.country_name)
            else if ((filter.CountryType2 === ANY && filter.CountryType1 !== ANY))
                return (filter.CountryType1 === log.peer_requester.geo_info.country_name || filter.CountryType1 === log.peer_responder.geo_info.country_name)
            else if (filter.CountryType1 !== ANY && filter.CountryType2 !== ANY)
                return (log.peer_requester.geo_info.country_name === filter.CountryType1 && log.peer_responder.geo_info.country_name === filter.CountryType2) ||
                    (log.peer_requester.geo_info.country_name === filter.CountryType2 && log.peer_responder.geo_info.country_name === filter.CountryType1)
        }
    
        const isPeerIncluded = (arr, requesterPeerId, responderPeerId) => {
            return arr.length === 0 ? true : (arr.indexOf(requesterPeerId) > -1 || arr.indexOf(responderPeerId) > -1);
        }

        const isPeerExcluded = (arr, requesterPeerId, responderPeerId) => {
            return arr.length === 0 ? false : (arr.indexOf(requesterPeerId) > -1 || arr.indexOf(responderPeerId) > -1);
        }

        return logs.filter(log => {
            const requesterPeerId = generatePeerPublicInfo(log.peer_requester.name, log.peer_requester.id);
            const responderPeerId = generatePeerPublicInfo(log.peer_responder.name, log.peer_responder.id);
            
            return isNatTypeMatching(log) && isOSMatching(log) && isProtocolMatching(log) 
                && isCountryMatching(log)
                && isPeerIncluded(filter.IncludePeerId, requesterPeerId, responderPeerId)
                && !isPeerExcluded(filter.ExcludePeerId, requesterPeerId, responderPeerId);
        });
    };

    const {type, payload} = msg;
    switch(type) {
        case 'PREPARE_LOGS':
            return prepareLogs(payload);

        case 'REVALIDATE':
            const filteredLogs = applyFilter(payload.logs, payload.filter);
            console.log('Filtered', filteredLogs);
            return prepareLogs(filteredLogs);
        default:
        return;
    }
};

Register(customWorker);