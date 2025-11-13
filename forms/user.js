import React from "react";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import { Form } from "antd";
import Checkbox from "@/components/ui/checkbox";

const UserForm = ({ setCreateState, createState, options }) => {
  return (
    <>
      <Form.Item
        name="phone"
        rules={[
          {
            required: true,
            message: "Please insert phone",
          },
        ]}
      >
        <div>
          <Input
            type={"number"}
            placeholder="Phone Number"
            labelText={"Phone Number"}
            onChange={(e) => {
              setCreateState({
                ...createState,
                phone: e.target.value,
              });
            }}
            value={createState?.phone}
          />
        </div>
      </Form.Item>
      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: "Please input name!",
          },
        ]}
      >
        <div>
          <Input
            type={"text"}
            placeholder="Name"
            labelText={"Name"}
            onChange={(e) => {
              setCreateState({
                ...createState,
                name: e.target.value,
              });
            }}
            value={createState?.name}
          />
        </div>
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Please input email!",
          },
        ]}
      >
        <div>
          <Input
            type={"email"}
            placeholder="Email"
            labelText={"Email"}
            onChange={(e) => {
              setCreateState({
                ...createState,
                email: e.target.value,
              });
            }}
            value={createState?.email}
          />
        </div>
      </Form.Item>
      <Form.Item
        name="active"
        rules={[
          {
            required: false,
            message: "Please Select.",
          },
        ]}
      >
        <div>
          <Checkbox
            id={"IsActive"}
            name={"IsActive"}
            labelText={"IsActive"}
            onChange={(e) => {
              console.log(e.target.checked, "e.target.checked");
              setCreateState({
                ...createState,
                active: e.target.checked,
              });
            }}
            value={createState?.active}
          />
        </div>
      </Form.Item>
    </>
  );
};

export default UserForm;
