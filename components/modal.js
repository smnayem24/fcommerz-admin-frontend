import { Modal } from "antd";
import React from "react";
const CustomModal = ({ children, title, open }) => {
  return (
    <Modal
      title={title}
      centered
      open={open}
      maskClosable={true}
      closable={false}
      footer={false}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
