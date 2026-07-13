import {
  UpComingEvents,
  DealsChart,
  DashboardTotalCountCards,
} from "@/component/home/index";
import LatestActivities from "@/component/home/latest-activities";
import { DASHBOARD_TOTAL_COUNTS_QUERY } from "@/graphql/queries";
import { useCustom } from "@refinedev/core";
import { Col, Row } from "antd";

export const Home = () => {
  const {
    result,
    query: { isLoading },
  } = useCustom({
    url: "",
    method: "get",
    meta: {
      gqlQuery: DASHBOARD_TOTAL_COUNTS_QUERY,
    },
  });

  return (
    <div>
      <Row gutter={[32, 32]}>
        <Col xs={24} md={24} lg={8}>
          <DashboardTotalCountCards
            resource="companies"
            isLoading={isLoading}
            totalCount={result?.data?.companies?.totalCount}
          />
        </Col>

        <Col xs={24} md={24} lg={8}>
          <DashboardTotalCountCards
            resource="contacts"
            isLoading={isLoading}
            totalCount={result?.data?.contacts?.totalCount}
          />
        </Col>

        <Col xs={24} md={24} lg={8}>
          <DashboardTotalCountCards
            resource="deals"
            isLoading={isLoading}
            totalCount={result?.data?.deals?.totalCount}
          />
        </Col>
      </Row>

      <Row gutter={[32, 32]} style={{ marginTop: "32px" }}>
        <Col xs={24} md={24} lg={8} style={{ height: "460px" }}>
          <UpComingEvents />
        </Col>

        <Col xs={24} md={24} lg={16} style={{ height: "460px" }}>
          <DealsChart />
        </Col>
      </Row>

      <Row gutter={[32, 32]} style={{ margin: "32px 0 0 0", width: "100%" }}>
        <LatestActivities />
      </Row>
    </div>
  );
};
