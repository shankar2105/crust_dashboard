export const ConnectionResult = {
    NONE: 0,
    SUCCESS: 1,
    FAILURE: 2
};

export const NatType = {
    ANY: 'ANY',
    EDM: 'EDM',
    EIM: 'EIM',
    EDM_RANDOM: 'EDM_RANDOM'
}

export const OS = {
    ANY: 'ANY',
    Windows: 'WIN',
    OSX: 'OSX',
    LINUX: 'LINUX'
}

export const PROTOCOL = {
    ANY: 'ANY',
    TCP_DIRECT: 'TCP_DIRECT',
    UTP_HP: 'UTP_HP',
    TCP_HP: 'TCP_HP'
}

export const Filter = {
    NatType1: NatType.ANY,
    NatType2: NatType.ANY,
    OSType1: OS.ANY,
    OSType2: OS.ANY,
    CountryType1: OS.ANY,
    CountryType2: OS.ANY,
    Protocol: PROTOCOL.ANY
}

export const mods = {
    CON_ACT_:'CON_ACT_'
}