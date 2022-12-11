import React, { useEffect } from "react";
import Search from "antd/lib/input/Search";
import TableRegulation from "./components/TableRegulation";
import RegulationForm from "./components/RegulationForm";
import ModalForm from "../../../HOC/ModalForm";
import { modalActions } from "../../../redux/reducer/ModalReducer";
import { useDispatch } from "react-redux";
import TableOtherRegulation from "./components/TableOtherRegulation";
import * as SagaActionTypes from "../../../redux/constants/constant";

const SettingPage = () => {
  const dispatch = useDispatch();

  const handleAddNewRegulation = () => {
    dispatch(
      modalActions.showModal({
        title: "Thêm trạng thái",
        ComponentContent: <RegulationForm />,
      })
    );
  };

  return (
    <>
      <div className="ml-4 mt-5 mr-3 mb-5 flex flex-col justify-between items-center md:flex-row">
        <p className="font-semibold text-base">Quy định trạng thái hàng hoá</p>

        <div className="search-container flex flex-col items-center md:flex-row">
          {/* button search */}
          <button
            className="flex items-center justify-center
                    bg-blue-500 h-8 w-fit p-2 text-white
                    md:mt-0 hover:bg-blue-600 shadow-lg rounded whitespace-nowrap"
            onClick={handleAddNewRegulation}
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
            Thêm trạng thái
          </button>
        </div>
      </div>
      <TableRegulation />

      <p className="ml-4 mt-5 font-semibold text-base">Quy định khác</p>

      <TableOtherRegulation />

      <ModalForm />
    </>
  );
};

export default SettingPage;
