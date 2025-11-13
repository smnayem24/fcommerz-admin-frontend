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
            type={"number"}
            placeholder="01620000000"
            labelText={"Phone Number"}
            onChange={(e) => {
              setCredentials({
                ...credentials,
                phone: e.target.value,
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
            onChange={(e) => {
              setCredentials({
                ...credentials,
                password: e.target.value,
              });
            }}
          />
        </div>
      </Form.Item>

      <div className="text-right mt-2">
        <CommonLink href="/forgotpassword" text={"Forgot Password?"} />
      </div>

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
