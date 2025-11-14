import React from "react";
import Input from "@/components/ui/input";
import { Form } from "antd";

const UserForm = ({ setCreateState, createState }) => {
  return (
    <>
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
        name="password"
        rules={[
          {
            required: true,
            message: "Please insert password!",
          },
        ]}
      >
        <div>
          <Input
            type={"text"}
            placeholder="Password"
            labelText={"Password"}
            onChange={(e) => {
              setCreateState({
                ...createState,
                password: e.target.value,
              });
            }}
            value={createState?.password}
          />
        </div>
      </Form.Item>
    </>
  );
};

export default UserForm;
