import Search from "antd/lib/input/Search";
import React from "react";
import TableStaffs from "./components/TableStaffs";
import ModalForm from "../../../HOC/ModalForm";

const StaffsPage = () => {
  return (
    <>
      <div className="ml-7 mt-5 mr-3 mb-5 flex flex-col justify-between items-center md:flex-row">
        <p className="font-semibold text-base">Danh sách nhân viên</p>

        <div className="search-container flex flex-col items-center md:flex-row">
          <Search
            name="search"
            placeholder="Tìm kiếm..."
            allowClear
            // onSearch={onSearch}
          />
          {/* button search */}
          <button
            className="flex items-center justify-center
                      bg-blue-500 h-8 w-60 p-2 ml-2 text-white  
                      mt-3 md:mt-0 hover:bg-blue-600 shadow-lg"

            // onClick={handleAddStaff}
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
      <TableStaffs />
      <ModalForm isOpen={false} />
    </>
  );
};

export default StaffsPage;
