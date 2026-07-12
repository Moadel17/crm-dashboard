import { Layout, Space } from "antd";
import CurrentUser from "./current-user";

export const Header = () => {
  const headerStyle = {
    backgroundColor: "white",
    display: "flex",
    justifyContent: "right",
    padding: "0 25px",
  };

  return (
    <Layout.Header style={headerStyle}>
      <Space>
        <CurrentUser />
      </Space>
    </Layout.Header>
  );
};
