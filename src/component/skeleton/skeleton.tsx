import { MoreOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Skeleton, Space } from "antd";
import { KanbanBoardContainer } from "../tasks/kanban/kanbanBoard";

export const KanbanColumnSkeleton = ({ children }: React.PropsWithChildren) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "0 16px",
      }}>
      <div
        style={{
          padding: "12px",
        }}>
        <Space
          style={{
            width: "100%",
            justifyContent: "space-between",
          }}>
          <Skeleton.Button size="small" style={{ width: "125px" }} />
          <Button
            disabled
            type="text"
            shape="circle"
            icon={
              <MoreOutlined
                style={{
                  transform: "rotate(90deg)",
                }}
              />
            }
          />
          <Button disabled shape="circle" icon={<PlusOutlined />} />
        </Space>
      </div>
      <div
        style={{
          flex: 1,
          border: "2px dashed transparent",
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

export const PageSkeleton = () => {
  const columnCount = 6;
  const itemCount = 4;

  return (
    <KanbanBoardContainer>
      {Array.from({ length: columnCount }).map((_, index) => {
        return (
          <KanbanColumnSkeleton key={index}>
            {Array.from({ length: itemCount }).map((_, index) => {
              return <ProjectCardSkeleton key={index} />;
            })}
          </KanbanColumnSkeleton>
        );
      })}
    </KanbanBoardContainer>
  );
};

export const ProjectCardSkeleton = () => {
  return (
    <Card
      size="small"
      bodyStyle={{
        display: "flex",
        justifyContent: "center",
        gap: "8px",
      }}
      title={
        <Skeleton.Button
          active
          size="small"
          style={{
            width: "200px",
            height: "22px",
          }}
        />
      }>
      <Skeleton.Button
        active
        size="small"
        style={{
          width: "200px",
        }}
      />
      <Skeleton.Avatar active size="small" />
    </Card>
  );
};
