import { Pagination } from "antd";
import React from "react";

const CustomPagination = ({ totalPage, setState, state }) => {
  const onChange = (pageNumber) => {
    setState((prevState) => ({
      ...prevState,
      page: pageNumber,
    }));
  };
  return (
    <div className="my-5 flex justify-end">
      <Pagination
        showQuickJumper
        current={state.page}
        total={totalPage}
        onChange={onChange}
      />
    </div>
  );
};

export default CustomPagination;
