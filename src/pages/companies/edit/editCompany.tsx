import { UPDATE_COMPANY_MUTATION, USERS_SELECT_QUERY } from "@/graphql/queries";
import { UsersSelectQuery } from "@/graphql/types";
import { Edit, useForm } from "@refinedev/antd";
import { useSelect } from "@refinedev/core";
import { GetFieldsFromList } from "@refinedev/nestjs-query";
import { Col, Row } from "antd";
import { CompanyContactsTable } from "./contact-table";
import FormEdit from "./formEdit";

export const EditCompany = () => {
  // Get Form Company Data
  const {
    saveButtonProps,
    formProps,
    formLoading,
    query: queryForm,
  } = useForm({
    redirect: false,
    meta: {
      gqlMutation: UPDATE_COMPANY_MUTATION,
    },
  });

  // Get User Name & Profile photo
  const { avatarUrl, name } = queryForm?.data?.data || {};

  //Get Select Options
  const { options, query: querySelect } = useSelect<
    GetFieldsFromList<UsersSelectQuery>
  >({
    resource: "users",
    optionLabel: "name",
    pagination: { mode: "off" },
    meta: {
      gqlQuery: USERS_SELECT_QUERY,
    },
  });

  return (
    <div>
      <Row gutter={[32, 32]}>
        <Col xs={24} xl={12}>
          <Edit
            isLoading={formLoading}
            saveButtonProps={saveButtonProps}
            breadcrumb={false}>
            <FormEdit
              formProps={formProps}
              avatarUrl={avatarUrl}
              name={name}
              querySelect={querySelect}
              selectProps={options}
            />
          </Edit>
        </Col>

        <Col xs={24} xl={12}>
          <CompanyContactsTable />
        </Col>
      </Row>
    </div>
  );
};
