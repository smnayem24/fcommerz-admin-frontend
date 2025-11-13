import { message } from "antd";

export const displaySuccessMessage = (text) => {
  message.success(text);
};

export const displaywaringMessage = (text) => {
  message.warning(text);
};

export const displayErrorMessage = (text) => {
  message.error(text);
};