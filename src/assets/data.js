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
  { x: 1538414930276, y1: 50, y2: 40, y3: 10},
  { x: 1538415062278, y1: 31, y2: 20, y3: 11},
  { x: 1538415149420, y1: 25, y2: 10, y3: 15},
  { x: 1538415164928, y1: 30, y2: 15, y3: 15},
  { x: 1538417574996, y1: 15, y2: 10, y3: 25}
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

const logs = [
    {
      createdAt: "2018-09-28T05:27:27.242Z",
      peer_requester: {
        ip: "182.74.140.194",
        nat_type: "EIM",
        os: "Windows",
        geo_info: {
          region: "Karnataka",
          region_code: "KA",
          country: "IN",
          country_name: "India"
        }
      },
      peer_responder: {
        ip: "84.160.11.231",
        nat_type: "EDM",
        os: "Windows",
        geo_info: {
          region: "Baden-Württemberg Region",
          region_code: "BW",
          country: "DE",
          country_name: "Germany"
        }
      },
      is_direct_successful: true,
      utp_hole_punch_result: {
        Succeeded: {
          time_spent: {
            secs: 1,
            nanos: 14
          }
        }
      },
      tcp_hole_punch_result: "success"
    },
    {
      createdAt: "2018-09-28T05:27:27.242Z",
      peer_requester: {
        ip: "182.74.140.194",
        nat_type: "EIM",
        os: "Windows",
        geo_info: {
          region: "Karnataka",
          region_code: "KA",
          country: "IN",
          country_name: "Scotland"
        }
      },
      peer_responder: {
        ip: "84.160.11.231",
        nat_type: "EIM",
        os: "Mac OS",
        geo_info: {
          region: "Baden-Württemberg Region",
          region_code: "BW",
          country: "DE",
          country_name: "UK"
        }
      },
      is_direct_successful: false,
      utp_hole_punch_result: {

      },
      tcp_hole_punch_result: "failure"
    },
    {
      createdAt: "2018-09-28T05:27:27.242Z",
      peer_requester: {
        ip: "182.74.140.194",
        nat_type: "EDM",
        os: "Mac OS",
        geo_info: {
          region: "Karnataka",
          region_code: "KA",
          country: "IN",
          country_name: "Scotland"
        }
      },
      peer_responder: {
        ip: "84.160.11.231",
        nat_type: "EIM",
        os: "Linux",
        geo_info: {
          region: "Baden-Württemberg Region",
          region_code: "BW",
          country: "DE",
          country_name: "France"
        }
      },
      is_direct_successful: true,
      utp_hole_punch_result: {

      },
      tcp_hole_punch_result: "success"
    },
    {
      createdAt: "2018-09-28T05:27:27.242Z",
      peer_requester: {
        ip: "182.74.140.194",
        nat_type: "EDM",
        os: "Linux",
        geo_info: {
          region: "Karnataka",
          region_code: "KA",
          country: "IN",
          country_name: "USA"
        }
      },
      peer_responder: {
        ip: "84.160.11.231",
        nat_type: "EDM",
        os: "Mac OS",
        geo_info: {
          region: "Baden-Württemberg Region",
          region_code: "BW",
          country: "DE",
          country_name: "India"
        }
      },
      is_direct_successful: true,
      utp_hole_punch_result: {
        Succeeded: {
          time_spent: {
            secs: 0,
            nanos: 36
          }
        }
      },
      tcp_hole_punch_result: "failure"
    }
  ];
  
  const filtered_logs = [];
  
  export default {
    globalNetworkActivity,
    logs,
    filtered_logs
  };
  