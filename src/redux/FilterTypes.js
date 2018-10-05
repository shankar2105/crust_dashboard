export const ConnectionResult = {
    NONE: 0,
    SUCCESS: 1,
    FAILURE: 2
};

export const NatType = {
    ANY: '',
    EDM: 'EDM',
    EIM: 'EIM'
}

export const OS = {
    ANY: '',
    WIN: 'WIN',
    OSX: 'OSX',
    LINUX: 'LINUX'
}

export const PROTOCOL = {
    ANY: '',
    TCP_DIRECT: 'TCP_DIRECT',
    UTP_HP: 'UTP_HP',
    TCP_HP: 'TCP_HP'
}

export const Filter = {
    RequesterNatType: NatType.ANY,
    ResponderNatType: NatType.ANY,
    RequesterOS: OS.ANY,
    ResponderOS: OS.ANY,
    RequesterCountry: OS.ANY,
    ResponderCountry: OS.ANY,
    Protocol: PROTOCOL.ANY
}
