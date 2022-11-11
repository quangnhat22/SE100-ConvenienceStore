import { Table } from "antd";
import "./TableTemplate.css";

const TableTemplate = ({ columns, dataSource }) => {
  return (
    <Table
      pagination={{ pageSize: 12, showSizeChanger: false }}
      locale={{
        triggerDesc: "Nhấp để sắp xếp giảm dần",
        triggerAsc: "Nhấp để sắp xếp tăng dần",
        cancelSort: "Trở về mặc định",
      }}
      rowKey={"id"}
      className="header-style m-3 drop-shadow-lg"
      size="middle"
      columns={columns}
      rowClassName={(record, index) =>
        index % 2 === 0 ? "table-row-light" : "table-row-dark"
      }
      dataSource={dataSource}
      //  onChange={handleChange}
      scroll={{ x: 1100 }}
    />
  );
};

export default TableTemplate;
