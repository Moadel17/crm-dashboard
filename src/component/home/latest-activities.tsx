import { UnorderedListOutlined } from "@ant-design/icons";
import { Card, List, Space } from "antd";
import { Text } from "../Header/text";
import { AccordionHeaderSkeleton } from "../accordion";
import { useList } from "@refinedev/core";
import {
  DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY,
  DASHBOARD_LATEST_ACTIVITIES_DEALS_QUERY,
} from "@/graphql/queries";
import dayjs from "dayjs";
import CustomAvatar from "../Header/custom-avatar";

function LatestActivities() {
  const {
    result: aduit,
    query: { isLoading: AduitLoading, isError, error },
  } = useList({
    resource: "audits",
    meta: {
      gqlQuery: DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY,
    },
  });

  const deal_Ids = aduit?.data?.map((aduit) => aduit?.targetId);

  const {
    result: deals,
    query: { isLoading: DealsLoading },
  } = useList({
    resource: "deals",
    queryOptions: { enabled: !!deal_Ids?.length },
    pagination: { mode: "off" },
    filters: [{ field: "id", operator: "in", value: deal_Ids }],
    meta: {
      gqlQuery: DASHBOARD_LATEST_ACTIVITIES_DEALS_QUERY,
    },
  });
  const isLoading = DealsLoading && AduitLoading;

  return (
    <Card
      headStyle={{ padding: "16px" }}
      bodyStyle={{ padding: "0 1rem" }}
      style={{ width: "100%" }}
      title={
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <UnorderedListOutlined />
          <Text size="md" style={{ marginLeft: "0.rem" }}>
            Latest Activities
          </Text>
        </div>
      }>
      {isLoading ? (
        <List
          itemLayout="horizontal"
          dataSource={Array.from({ length: 5 }).map((_, i) => ({
            id: i,
          }))}
          renderItem={(_, index) => <AccordionHeaderSkeleton key={index} />}
        />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={aduit.data}
          renderItem={(item) => {
            const deal =
              deals.data.find((deal) => deal.id === String(item.targetId)) ||
              undefined;

            return (
              <List.Item>
                <List.Item.Meta
                  title={dayjs(deal?.createdAt).format("MMM DD, YYYY - HH:mm")}
                  avatar={
                    <CustomAvatar
                      shape="square"
                      size={48}
                      src={deal?.company.avatarUrl}
                      name={deal?.company.name}
                    />
                  }
                  description={
                    <Space size={4}>
                      <Text>{item?.user?.name}</Text>
                      <Text>
                        {item.action === "CREATE" ? "created" : "moved"}
                      </Text>
                      <Text>{deal?.title}</Text>
                      <Text>deal</Text>
                      <Text>{item.action === "CREATE" ? "in" : "to"}</Text>
                      <Text>{deal?.stage?.title}</Text>
                    </Space>
                  }
                />
              </List.Item>
            );
          }}
        />
      )}
    </Card>
  );
}

export default LatestActivities;
