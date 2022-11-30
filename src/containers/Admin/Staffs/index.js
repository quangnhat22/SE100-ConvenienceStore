import Search from "antd/lib/input/Search";
import React from "react";
import { useState } from "react";
import TableStaffs from "./components/TableStaffs";
import ModalForm from "../../../HOC/ModalForm";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../../redux/reducer/ModalReducer";
import AddStaffForm from "./components/AddStaffForm";
import { useEffect } from "react";
import * as SagaActionTypes from "../../../redux/constants/constant";

const StaffsPage = () => {
  const dispatch = useDispatch();
  const { staffs } = useSelector((state) => state.staffsSlice);
  const [keyWord, setKeyWord] = useState("");
  useEffect(() => {
    dispatch({ type: SagaActionTypes.GET_LIST_USER_SAGA });
  }, []);

  const handleAddStaff = () => {
    dispatch(
      modalActions.showModal({
        ComponentContent: <AddStaffForm />,
      })
    );
  };

  return (
    <>
      <div className="ml-7 mt-5 mr-3 mb-5 flex flex-col justify-between items-center md:flex-row gap-y-2">
        <p className="font-semibold  text-2xl whitespace-nowrap">
          Danh sách nhân viên
        </p>

        <div className="search-container flex flex-col items-center md:flex-row gap-x-4 gap-y-2">
          <Search
            name="search"
            placeholder="Tìm kiếm..."
            allowClear
            onSearch={(value) => {
              setKeyWord(value);
            }}
          />
          {/* button search */}
          <button
            className="flex items-center justify-center
                      bg-blue-500 h-8 w-fit p-2 text-white  
                      md:mt-0 hover:bg-blue-600 shadow-lg rounded whitespace-nowrap"
            onClick={handleAddStaff}
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
            Thêm nhân viên
          </button>
        </div>
      </div>
      <TableStaffs keyWord={keyWord} data={staffs} />
      <ModalForm />
    </>
  );
};

export default StaffsPage;
