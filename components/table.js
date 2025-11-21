import { Table } from "antd";

const CustomTable = ({ columns, dataSource, loading, footer, ...rest }) => {
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      size="small"
      loading={loading}
      className="mt-4 custom-table"
      scroll={{
        y: 700,
        x: "1000px",
      }}
      pagination={false}
      rowKey={(dataSource) => dataSource._id}
      footer={footer}
      {...rest}
    />
  );
};

export default CustomTable;
