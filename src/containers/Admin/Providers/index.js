import Search from "antd/lib/input/Search";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import TableProvider from "./components/TableProvider";
import { modalActions } from "../../../redux/reducer/ModalReducer";
import AddProviderForm from "./components/AddProviderForm";
import ModalForm from "../../../HOC/ModalForm";
import * as SagaActionTypes from "../../../redux/constants/constant";

//Data Demo
// const providers = [
//   {
//     maNhaCungCap: "NCC1",
//     tenNhaCungCap: "TẠP HÓA CHỊ HUYỀN",
//     nhomNhaCungCap: "MACDINH",
//     email: "huynhhgt@gnmail.com",
//     soDienThoai: "0967654554",
//     trangThai: true,
//   },
//   {
//     maNhaCungCap: "NCC2",
//     tenNhaCungCap: "NHÀ PHÂN PHỐI ĐÔNG BA",
//     nhomNhaCungCap: "MACDINH",
//     email: "dongbacoop@gmail.com",
//     soDienThoai: "0978654654",
//     trangThai: true,
//   },
//   {
//     maNhaCungCap: "NCC3",
//     tenNhaCungCap: "SIÊU THỊ CẨM THƠ",
//     nhomNhaCungCap: "MACDINH",
//     email: "camtho.super@gmail.com",
//     soDienThoai: "0387656734",
//     trangThai: false,
//   },
//   {
//     maNhaCungCap: "NCC4",
//     tenNhaCungCap: "NƯỚC NGỌT SÀI THÀNH",
//     nhomNhaCungCap: "MACDINH",
//     email: "saithanhdrinking@gmail.com",
//     soDienThoai: "0987678654",
//     trangThai: true,
//   },
//   {
//     maNhaCungCap: "NCC5",
//     tenNhaCungCap: "NƯỚC NGỌT VĨNH HẢO",
//     nhomNhaCungCap: "MACDINH",
//     email: "vinhhao.tphcm@gmail.com",
//     soDienThoai: "0988989345",
//     trangThai: true,
//   },
// ];

const ProvidersPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { providers } = useSelector((state) => state.providerSlice);
  console.log("providers", providers);
  useEffect(() => {
    dispatch({ type: SagaActionTypes.GET_LIST_PROVIDER_SAGA });
  }, []);
  const handleAddProvider = () => {
    dispatch(
      modalActions.showModal({
        ComponentContent: <AddProviderForm />,
      })
    );
  };

  return (
    <>
      <div className="ml-7 mt-5 mr-3 mb-8">
        <div className="search-container flex flex-col items-center md:flex-row justify-end items-center gap-x-4 gap-y-2 w-full">
          <div className="inline-block font-semibold md:mr-auto text-base whitespace-nowrap text-2xl">
            Danh sách nhà cung cấp
          </div>
          <Search
            className="min-w-min max-w-xs"
            name="search"
            placeholder="Tìm kiếm..."
            allowClear
            // onSearch={onSearch}
          />
          {/* button search */}
          <button
            className="flex items-center justify-center
                    bg-blue-500 h-8 w-fit p-2 text-white
                    md:mt-0 hover:bg-blue-600 shadow-lg rounded whitespace-nowrap"
            onClick={handleAddProvider}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 mr-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Thêm nhà cung cấp
          </button>
        </div>
      </div>

      <TableProvider listProviders={providers} />
      <ModalForm />
    </>
  );
};

export default ProvidersPage;
