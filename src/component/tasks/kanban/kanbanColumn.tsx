import { Text } from "@/component/Header/text";
import { PlusCircleOutlined } from "@ant-design/icons";
import { UseDraggableArguments, useDroppable } from "@dnd-kit/core";
import { Badge, Button, Space } from "antd";

type props = {
  id: string;
  data?: UseDraggableArguments["data"];
  title: string;
  count: number;
  description?: React.ReactNode;
  clickAdd: (argu: { id: string }) => void;
};

export const KanbanColumns = ({
  children,
  id,
  data,
  title,
  description,
  count,
  clickAdd,
}: React.PropsWithChildren<props>) => {
  const { isOver, setNodeRef, active } = useDroppable({
    id,
    data,
  });

  function addTaskHandler() {
    clickAdd?.({ id });
  }

  return (
    <div
      ref={setNodeRef}
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "0 16px",
      }}>
      <div style={{ padding: "12px" }}>
        <Space style={{ width: "100%", justifyContent: "space-between" }}>
          <Space>
            <Text
              ellipsis={{ tooltip: "Title To Do" }}
              size="xs"
              strong
              style={{ textTransform: "uppercase", whiteSpace: "nowrap" }}>
              {title}
            </Text>
            {count > 0 && <Badge count={count} color="cyan" />}
          </Space>
          <Button
            shape="circle"
            icon={<PlusCircleOutlined />}
            onClick={addTaskHandler}
          />
        </Space>
        {description}
      </div>
      <div
        style={{
          flex: 1,
          overflow: active ? "unset" : "auto",
          border: "2px dashed transparent",
          borderColor: isOver ? "#000040" : "transparent",
          borderRadius: "4px",
        }}>
        <div
          style={{
            marginTop: "12px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}>
          {children}
        </div>
      </div>
    </div>
  );
};
