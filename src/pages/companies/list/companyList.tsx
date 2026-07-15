import CustomAvatar from "@/component/Header/custom-avatar";
import { Text } from "@/component/Header/text";
import { COMPANIES_LIST_QUERY } from "@/graphql/queries";
import { Company } from "@/graphql/schema.types";
import { currencyNumber } from "@/utilitis";
import { SearchOutlined } from "@ant-design/icons";
import {
  CreateButton,
  DeleteButton,
  EditButton,
  FilterDropdown,
  getDefaultFilter,
  List,
  useTable,
} from "@refinedev/antd";
import { useGo } from "@refinedev/core";
import { Input, Space, Table } from "antd";
import { PropsWithChildren } from "react";

export const CompaniesList = ({ children }: PropsWithChildren) => {
  const go = useGo();
  const { tableProps, filters } = useTable({
    resource: "companies",
    pagination: { pageSize: 12 },
    onSearch: (values) => {
      return [
        {
          field: "name",
          operator: "contains",
          value: values.name,
        },
      ];
    },
    sorters: {
      initial: [{ field: "createdAt", order: "desc" }],
    },
    filters: {
      initial: [{ field: "name", operator: "contains", value: undefined }],
    },
    meta: {
      gqlQuery: COMPANIES_LIST_QUERY,
    },
  });

  return (
    <div>
      <List
        breadcrumb={false}
        headerButtons={() => (
          <CreateButton
            onClick={() => {
              go({
                to: {
                  resource: "companies",
                  action: "create",
                },
                options: {
                  keepQuery: true,
                },
                type: "replace",
              });
            }}
          />
        )}>
        <Table {...tableProps} pagination={{ ...tableProps.pagination }}>
          <Table.Column<Company>
            dataIndex="name"
            title="Company Name"
            defaultFilteredValue={getDefaultFilter("id", filters)}
            filterIcon={<SearchOutlined />}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input placeholder="Search Company" />
              </FilterDropdown>
            )}
            render={(_, record) => (
              <Space>
                <CustomAvatar
                  shape="square"
                  name={record.name}
                  src={record.avatarUrl}
                />
                <Text style={{ whiteSpace: "nowrap" }}>{record.name}</Text>
              </Space>
            )}
          />

          <Table.Column<Company>
            dataIndex="totalRevenue"
            title="Open Deals Amount"
            render={(_, company) => (
              <Text>
                {currencyNumber(company?.dealsAggregate?.[0]?.sum?.value || 0)}
              </Text>
            )}
          />

          <Table.Column<Company>
            dataIndex="id"
            title="Actions"
            render={(value) => (
              <Space>
                <EditButton size="small" hideText recordItemId={value} />
                <DeleteButton size="small" hideText recordItemId={value} />
              </Space>
            )}
          />
        </Table>
      </List>
      {children}
    </div>
  );
};
