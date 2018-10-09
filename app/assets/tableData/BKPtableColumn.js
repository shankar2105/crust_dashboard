import React from "react";
import { Icon } from "antd";

const columns = [
    {
      title: "#",
      dataIndex: "num",
      key: "num",
      align: 'center',
      defaultSortOrder: 'ascend',
      render: (a, b) => {
        console.log(b);
        return (
          <table>
            <tbody>
              <tr>
                <td>
                  {b.direct === "No" &&
                  b.tcp_hp === "Fail" &&
                  b.utp_hp === "Fail" ? (
                    <Icon type="disconnect" style={{fontSize: 24, color: "red"}}/>
                  ) : (
                    <Icon type="check-circle" theme="filled" style={{fontSize: 24, color: "#52c41a"}}/>
                  )}
                </td>
                <td>{a}</td>
              </tr>
            </tbody>
          </table>
        );
      }
    },
    {
      title: "Direct",
      dataIndex: "direct",
      key: "direct",
      align: 'center',
      render: text => {
        return (
          <table>
            <tbody>
              <tr>
                <td>
                  {text === "Yes" ? (
                    <Icon
                      type="check-circle"
                      theme="twoTone"
                      twoToneColor="#52c41a"
                    />
                  ) : (
                    <Icon
                      type="close-circle"
                      theme="twoTone"
                      twoToneColor="red"
                    />
                  )}
                </td>
              </tr>
              <tr>
                <td>{text}</td>
              </tr>
            </tbody>
          </table>
        );
      }
    },
    {
      title: "TCP HP",
      dataIndex: "tcp_hp",
      key: "tcp_hp",
      align: 'center',
      render: text => {
        return (
          <table>
            <tbody>
              <tr>
                <td>
                  {text === "Fail" ? (
                    <Icon
                      type="close-circle"
                      theme="twoTone"
                      twoToneColor="red"
                    />
                  ) : (
                    <Icon
                      type="check-circle"
                      theme="twoTone"
                      twoToneColor="#52c41a"
                    />
                  )}
                </td>
              </tr>
              <tr>
                <td>{text}</td>
              </tr>
            </tbody>
          </table>
        );
      }
    },
    {
      title: "uTP HP",
      dataIndex: "utp_hp",
      key: "utp_hp",
      render: text => {
        return (
          <table>
            <tbody>
              <tr>
                <td>
                  {text === "Fail" ? (
                    <Icon
                      type="close-circle"
                      theme="twoTone"
                      twoToneColor="red"
                    />
                  ) : (
                    <Icon
                      type="check-circle"
                      theme="twoTone"
                      twoToneColor="#52c41a"
                    />
                  )}
                </td>
              </tr>
              <tr>
                <td>{text}</td>
              </tr>
            </tbody>
          </table>
        );
      }
    },
    {
      title: "",
      dataIndex: "req_res",
      key: "req_res",
      render: () => {
        return (
          <table style={{ textAlign: "right" }}>
            <tbody>
              <tr>
                <td>{`Requester`}</td>
              </tr>
              <tr>
                <td>{`Responder`}</td>
              </tr>
            </tbody>
          </table>
        );
      }
    },
    {
      title: "NAT Type",
      dataIndex: "nat_type",
      key: "nat_type",
      render: text => {
        return (
          <table>
            <tbody>
              <tr>
                <td>{text[0]}</td>
              </tr>
              <tr>
                <td>{text[1]}</td>
              </tr>
            </tbody>
          </table>
        );
      }
    },
    {
      title: "Operating System",
      dataIndex: "os",
      key: "os",
      filters: [
        { text: "MacOS 10.3", value: "MacOS 10.3" },
        { text: "Windows 10", value: "Windows 10" },
        { text: "Linux RedHat 1.2", value: "Linux RedHat 1.2" }
      ],
      render: text => {
        return (
          <table>
            <tbody>
              <tr>
                <td>{text[0]}</td>
              </tr>
              <tr>
                <td>{text[1]}</td>
              </tr>
            </tbody>
          </table>
        );
      }
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      sorter: (a, b) => a.country.length - b.country.length,
      render: text => {
        return (
          <table>
            <tbody>
              <tr>
                <td>{text[0]}</td>
              </tr>
              <tr>
                <td>{text[1]}</td>
              </tr>
            </tbody>
          </table>
        );
      }
    }
  ];

  export default columns;