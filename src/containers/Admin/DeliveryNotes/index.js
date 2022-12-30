import Search from "antd/lib/input/Search";
import React from "react";
import { useState } from "react";
import TableDeliveryNotes from "./components/TableDeliveryNotes";
import ModalForm from "../../../HOC/ModalForm";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../../redux/reducer/ModalReducer";
import { useEffect } from "react";
import * as SagaActionTypes from "../../../redux/constants/constant";
import AddDeliveryNoteForm from "./components/AddDeliveryNoteForm";

const DeliveryNotes = () => {
  const dispatch = useDispatch();
  const { deliveryNotes, loading, isCreateNewDeliveryNote } = useSelector(
    (state) => state.deliveryNotesSlice
  );
  const uid = localStorage.getItem("id");
  const [keyWord, setKeyWord] = useState("");
  useEffect(() => {
    dispatch({ type: SagaActionTypes.GET_LIST_DELIVERY_NOTES_SAGA });
    dispatch({ type: SagaActionTypes.GET_LIST_PROVIDER_SAGA });
    dispatch({ type: SagaActionTypes.GET_USER_BY_ID_SAGA, id: uid });
  }, []);

  const handleAddDeliveryNote = () => {
    dispatch(
      modalActions.showModal({
        ComponentContent: <AddDeliveryNoteForm />,
      })
    );
  };

  return (
    <>
      <div className="ml-7 mt-5 mr-3 mb-5 flex flex-col justify-between items-center md:flex-row gap-x-4 gap-y-2">
        <p className="font-semibold  text-2xl whitespace-nowrap">
          Danh sách phiếu nhập hàng
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
            onClick={handleAddDeliveryNote}
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
            Tạo phiếu nhập hàng
          </button>
        </div>
      </div>
      <TableDeliveryNotes
        keyWord={keyWord}
        data={deliveryNotes}
        loading={loading}
      />
      <ModalForm />
    </>
  );
};

export default DeliveryNotes;
