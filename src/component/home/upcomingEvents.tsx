import { CalculatorOutlined } from "@ant-design/icons";
import { Badge, Card, List } from "antd";
import { Text } from "../Header/text";
import { AccordionHeaderSkeleton } from "../accordion";
import { useList } from "@refinedev/core";
import { DASHBOARD_CALENDAR_UPCOMING_EVENTS_QUERY } from "@/graphql/queries";
import dayjs from "dayjs";

function UpComingEvents() {
  const {
    result,
    query: { isLoading },
  } = useList({
    resource: "events",
    pagination: { pageSize: 5 },
    sorters: [
      {
        field: "startDate",
        order: "asc",
      },
    ],
    filters: [
      {
        field: "startDate",
        operator: "gte",
        value: dayjs().format("YYYY-MM-DD"),
      },
    ],
    meta: {
      gqlQuery: DASHBOARD_CALENDAR_UPCOMING_EVENTS_QUERY,
    },
  });

  return (
    <Card
      style={{ height: "100%" }}
      headStyle={{ padding: "8px 16px" }}
      bodyStyle={{ padding: "0 1rem" }}
      title={
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <CalculatorOutlined />
          <Text size="sm" style={{ marginLeft: ".7rem" }}>
            Upcoming Events
          </Text>
        </div>
      }>
      {isLoading ? (
        <List
          itemLayout="horizontal"
          dataSource={Array.from({ length: 5 }).map((_, index) => ({
            id: index,
          }))}
          renderItem={() => <AccordionHeaderSkeleton />}
        />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={result.data || []}
          renderItem={(item) => {
            const renderDate = () => {
              const start = dayjs(item.startDate).format(
                "MMM DD, YYYY - HH:mm",
              );
              const end = dayjs(item.endDate).format("MMM DD, YYYY - HH:mm");

              return `${start} - ${end}`;
            };

            return (
              <List.Item>
                <List.Item.Meta
                  avatar={<Badge color={item.color} />}
                  title={<Text size="xs">{renderDate()}</Text>}
                  description={
                    <Text ellipsis={{ tooltip: true }} strong>
                      {item.title}
                    </Text>
                  }
                />
              </List.Item>
            );
          }}
        />
      )}

      {!isLoading && result.data.length === 0 && (
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "220px",
          }}>
          No Upcoming Events Found
        </span>
      )}
    </Card>
  );
}

export default UpComingEvents;
