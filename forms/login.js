import CommonLink from "@/components/commonLink";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Form } from "antd";
import React from "react";

const LoginForm = ({ onFinish, setCredentials, isLoading, credentials }) => {
  return (
    <Form className="mt-6" onFinish={onFinish}>
      <Form.Item
        name="phone"
        rules={[
          {
            required: true,
            message: "Please input your phone!",
          },
        ]}
        style={{ margin: 0 }}
      >
        <div>
          <Input
            type={"email"}
            placeholder="jhon@example.com"
            labelText={"Email"}
            value={credentials.email}
            onChange={(e) => {
              setCredentials({
                ...credentials,
                email: e.target.value,
              });
            }}
          />
        </div>
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        style={{ margin: 0 }}
      >
        <div className="mt-4">
          <Input
            type={"password"}
            placeholder="**********"
            labelText={"Password"}
            value={credentials.password}
            onChange={(e) => {
              setCredentials({
                ...credentials,
                password: e.target.value,
              });
            }}
          />
        </div>
      </Form.Item>

      <Form.Item>
        <div className="mt-4">
          <Button
            type={"submit"}
            btnName="Log In"
            size={"w-full py-3"}
            disabled={isLoading ? true : false}
          />
        </div>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
