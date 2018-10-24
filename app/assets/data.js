export const AreaChartArray = [
  {
    year: "1986",
    ACME: 162,
    Compitor: 42,
    TCP: 25,
    UDP: 35
  },
  {
    year: "1987",
    ACME: 134,
    Compitor: 54,
    TCP: 42,
    UDP: 24
  },
  {
    year: "1988",
    ACME: 116,
    Compitor: 26,
    TCP: 14,
    UDP: 42
  },
  {
    year: "1989",
    ACME: 122,
    Compitor: 32,
    TCP: 31,
    UDP: 24
  },
  {
    year: "1990",
    ACME: 178,
    Compitor: 68,
    TCP: 42,
    UDP: 24
  },
  {
    year: "1991",
    ACME: 144,
    Compitor: 54,
    TCP: 14,
    UDP: 53
  },
  {
    year: "1992",
    ACME: 125,
    Compitor: 35,
    TCP: 63,
    UDP: 24
  },
  {
    year: "1993",
    ACME: 176,
    Compitor: 66,
    TCP: 42,
    UDP: 52
  },
];

export const protocolData = [
  {
    type: "TCP D",
    value: 440
  },
  {
    type: "TCP HP",
    value: 3593
  },
  {
    type: "uTP HP",
    value: 249
  }
];

export const natData = [
  {
    type: "EDM",
    value: 2401
  },
  {
    type: "EIM",
    value: 2305
  },
  {
    type: "EDM-R",
    value: 2617
  },
  {
    type: "EDM/EIM",
    value: 1290
  },
  {
    type: "EDM/EDM-R",
    value: 970
  },
  {
    type: "EIM/EDM-R",
    value: 540
  }
];

export const LineChartArray = [
  { x: 1538414930276, y1: 50, y2: 40, y3: 10 },
  { x: 1538415062278, y1: 31, y2: 20, y3: 11 },
  { x: 1538415149420, y1: 25, y2: 10, y3: 15 },
  { x: 1538415164928, y1: 30, y2: 15, y3: 15 },
  { x: 1538417574996, y1: 15, y2: 10, y3: 25 }
];

const globalNetworkActivity = [
  {
    x: "Australia",
    y: 1901
  },
  {
    x: "China",
    y: 1809
  },
  {
    x: "UK",
    y: 1669
  },
  {
    x: "Spain",
    y: 965
  },
  {
    x: "Chad",
    y: 750
  },
  {
    x: "USA",
    y: 200
  },
  {
    x: "Portugal",
    y: 100
  },
  {
    x: "Ireland",
    y: 10
  },
  {
    x: "Russia",
    y: 10
  },
  {
    x: "Italy",
    y: 10
  },
  {
    x: "Norway",
    y: 10
  },
  {
    x: "France",
    y: 10
  }
];

//sample logs for testing
export const logs = [
  {
    "createdAt": "2018-10-22T07:41:39.949Z",
    "peer_requester": {
      "id": "a35bfd",
      "name": "ashwin",
      "nat_type": "EDM",
      "os": "linux",
      "geo_info": {
        "country_name": "Japan"
      }
    },
    "peer_responder": {
      "id": "4hd26f",
      "name": "drake",
      "nat_type": "EDM_RANDOM",
      "os": "Windows",
      "geo_info": {
        "country_name": "United States"
      }
    },
    "udp_hole_punch_result": "Failed",
    "tcp_hole_punch_result": "Succeeded",
    "logDataHash": "45fffa1",
    "isHairpinned": false,
    "is_direct_successful": false
  },
  {
    "createdAt": "2018-10-22T07:41:39.949Z",
    "peer_requester": {
      "id": "gh45f3",
      "name": "tod",
      "nat_type": "EDM",
      "os": "linux",
      "geo_info": {
        "country_name": "Iceland"
      }
    },
    "peer_responder": {
      "id": "gdd52s",
      "name": "",
      "nat_type": "EDM_RANDOM",
      "os": "macos",
      "geo_info": {
        "country_name": "United States"
      }
    },
    "udp_hole_punch_result": "Failed",
    "tcp_hole_punch_result": "Succeeded",
    "logDataHash": "45fsqa",
    "isHairpinned": false,
    "is_direct_successful": true
  },
  {
    "createdAt": "2018-10-22T07:41:39.949Z",
    "peer_requester": {
      "id": "gh45f3",
      "name": "",
      "nat_type": "EDM",
      "os": "linux",
      "geo_info": {
        "country_name": "Germany"
      }
    },
    "peer_responder": {
      "id": "g42ds2",
      "name": "",
      "nat_type": "EDM_RANDOM",
      "os": "macos",
      "geo_info": {
        "country_name": "United States"
      }
    },
    "udp_hole_punch_result": "Succeeded",
    "tcp_hole_punch_result": "Succeeded",
    "logDataHash": "4f43fa",
    "isHairpinned": false,
    "is_direct_successful": false
  },
];

const filtered_logs = [];

export default {
  globalNetworkActivity,
  logs,
  filtered_logs
};
