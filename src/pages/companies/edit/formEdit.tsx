import CustomAvatar from "@/component/Header/custom-avatar";
import { SelectOptionWithAvatar } from "@/component/SelectOptionavatar/select";
import { getNameInitials } from "@/utilitis";
import { Form, Input, InputNumber, Select } from "antd";
import React from "react";
import {
  businessTypeOptions,
  companySizeOptions,
  industryOptions,
} from "../constant";

export default function FormEdit({
  formProps,
  avatarUrl,
  name,
  selectProps,
  querySelect,
}: any) {
  return (
    <Form {...formProps} layout="vertical">
      <CustomAvatar
        shape="square"
        src={avatarUrl}
        name={getNameInitials(name || "")}
        style={{ width: 96, height: 96, marginBottom: "24px" }}
      />

      <Form.Item label="Company Name" name="name" rules={[{ required: true }]}>
        <Input placeholder="Enter Company Name" />
      </Form.Item>

      <Form.Item
        label="Sales Owner"
        name="salesOwnerId"
        initialValue={formProps?.initialValues?.salesOwner?.id}>
        <Select
          placeholder="Select A Sales Owner"
          {...selectProps}
          options={
            querySelect.data?.data?.map((user: any) => ({
              values: user.id,
              label: (
                <SelectOptionWithAvatar
                  name={user.name}
                  avatarUrl={user.avatarUrl || undefined}
                />
              ),
            })) || []
          }
        />
      </Form.Item>
      <Form.Item>
        <Select options={companySizeOptions} />
      </Form.Item>
      <Form.Item>
        <InputNumber autoFocus addonBefore="$" min={0} placeholder="0.00" />
      </Form.Item>

      <Form.Item label="Industry">
        <Select options={industryOptions} />
      </Form.Item>
      <Form.Item label="Business Type">
        <Select options={businessTypeOptions} />
      </Form.Item>
      <Form.Item label="Country" name="country">
        <Input placeholder="Country" />
      </Form.Item>
      <Form.Item label="Website" name="website">
        <Input placeholder="Website" />
      </Form.Item>
    </Form>
  );
}
