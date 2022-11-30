import { useState } from "react";
import TableTemplate from "../../../../common/Table/TableTemplate";
import moment from "moment";
import ModalForm from "../../../../HOC/ModalForm";

//Data Demo
// const productlines = [
//   {
//     maDongSanPham: "NCC1",
//     tenDongSanPham: "Sữa và đồ uống từ sữa",
//     tonKho: 20,
//     ban: 20,
//     ngayKhoiTao: "12/1/2021",
//   },
//   {
//     maDongSanPham: "NCC2",
//     tenDongSanPham: "Thực phẩm đóng hộp và khô",
//     tonKho: 20,
//     ban: 20,
//     ngayKhoiTao: "12/1/2021",
//   },
//   {
//     maDongSanPham: "NCC3",
//     tenDongSanPham: "Đồ uống dạng bột",
//     tonKho: 20,
//     ban: 20,
//     ngayKhoiTao: "12/6/2021",
//   },
//   {
//     maDongSanPham: "NCC4",
//     tenDongSanPham: "Gia vị và chế biến",
//     tonKho: 20,
//     ban: 20,
//     ngayKhoiTao: "2/5/2021",
//   },
//   {
//     maDongSanPham: "NCC5",
//     tenDongSanPham: "Đồ ăn vặt",
//     tonKho: 20,
//     ban: 20,
//     ngayKhoiTao: "12/15/2021",
//   },
// ];

const TableProductLines = ({ data }) => {
  console.log("data: ", data);
  const [page, setPage] = useState(1);
  const columns = [
    {
      title: "STT",
      dataIndex: "",
      key: "",
      render: (text, record, index) => (page - 1) * 6 + index + 1,
    },
    {
      title: "Mã dòng sản phẩm",
      dataIndex: "id",
      key: "id",
      sorter: (item1, item2) =>
        item1.id.localeCompare(item2.maDongSanPham),
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Tên dòng sản phẩm",
      dataIndex: "title",
      key: "title",
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Có thể bán",
      dataIndex: "ban",
      key: "ban",
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Tồn kho",
      dataIndex: "tonKho",
      key: "tonKho",
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: "Ngày khởi tạo",
      dataIndex: "ngayKhoiTao",
      key: "ngayKhoiTao",
      showOnResponse: true,
      showOnDesktop: true,
      render: (ngayKhoiTao) => `${moment(ngayKhoiTao).format("DD/MM/YYYY")}`,
    },
  ];
  return (
    <>
      <TableTemplate
        columns={columns}
        dataSource={data}
        pagination={{
          onChange(current) {
            setPage(current);
          },
          defaultPageSize: 6,
          showSizeChanger: false,
          pageSizeOptions: ["6"],
        }}
        rowKey={"maDongSanPham"}
      />
    </>
  );
};

export default TableProductLines;
