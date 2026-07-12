import { Card, Skeleton } from "antd";
import { Text } from "../Header/text";
import { variants } from "./varnits";
import { Area, AreaConfig } from "@ant-design/plots";

type Type = "companies" | "contacts" | "deals";

interface countProps {
  resource: Type;
  isLoading: boolean;
  totalCount?: number;
}

function DashboardTotalCountCards({
  resource,
  isLoading,
  totalCount,
}: countProps) {
  const { primaryColor, secondaryColor, icon, title } = variants[resource];

  const config: AreaConfig = {
    appendPadding: [1, 0, 0, 0],
    padding: 0,
    syncViewPadding: true,
    data: variants[resource].data,
    autoFit: true,
    tooltip: false,
    animation: false,
    xField: "index",
    yField: "value",
    xAxis: false,
    yAxis: {
      tickCount: 12,
      label: {
        style: {
          fill: "transparent",
        },
      },
      grid: {
        line: {
          style: {
            stroke: "transparent",
          },
        },
      },
    },
    smooth: true,
    areaStyle: () => {
      return {
        fill: `l(270) 0:#fff 0.2:${secondaryColor} 1:${primaryColor}`,
      };
    },
    line: {
      color: primaryColor,
    },
  };

  return (
    <Card style={{ height: "", padding: 0 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          whiteSpace: "nowrap",
        }}>
        {icon}
        <Text>{title}</Text>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Text
          size="xxl"
          strong
          style={{
            flex: 1,
            whiteSpace: "nowrap",
            flexShrink: 0,
            textAlign: "start",
            marginLeft: "48px",
            fontVariantNumeric: "tabular-nums",
          }}>
          {isLoading ? (
            <Skeleton.Button style={{ marginTop: "8px", width: "74px" }} />
          ) : (
            totalCount
          )}
        </Text>
        <Area {...config} style={{ width: "50%" }} />
      </div>
    </Card>
  );
}

export default DashboardTotalCountCards;
