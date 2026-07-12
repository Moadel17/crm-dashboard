import { Button, Popover } from "antd";
import CustomAvatar from "./custom-avatar";
import { useGetIdentity } from "@refinedev/core";
import type { User } from "@/graphql/schema.types";
import { useState } from "react";
import { SettingOutlined } from "@ant-design/icons";
import { Text } from "./text";
import { AccountSetting } from "../account-setting/account-setting";

const CurrentUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: user } = useGetIdentity<User>();

  const content = (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Text strong style={{ padding: "12px 20px" }}>
        {user?.name}
      </Text>
      <div
        style={{
          borderTop: "1px solid #d9d9d9",
          padding: "4px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}>
        <Button
          style={{ textAlign: "left" }}
          icon={<SettingOutlined />}
          type="text"
          block
          onClick={() => setIsOpen(true)}>
          Account Setting
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <Popover
        placement="bottomRight"
        trigger="click"
        overlayInnerStyle={{ padding: 0 }}
        overlayStyle={{ zIndex: 999 }}
        content={content}>
        <CustomAvatar
          name={user?.name}
          src={user?.avatarUrl}
          style={{ cursor: "pointer" }}
          size="default"
        />
      </Popover>

      {isOpen && (
        <AccountSetting
          opened={isOpen}
          setOpened={setIsOpen}
          userId={user?.id}
        />
      )}
    </>
  );
};

export default CurrentUser;
