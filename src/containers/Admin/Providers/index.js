import Search from "antd/lib/input/Search";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableProviders from "./components/TableProviders";
import { modalActions } from "../../../redux/reducer/ModalReducer";
import AddProviderForm from "./components/AddProviderForm";
import ModalForm from "../../../HOC/ModalForm";
import * as SagaActionTypes from "../../../redux/constants/constant";

const ProvidersPage = () => {
  const dispatch = useDispatch();
  const { providers, loading } = useSelector((state) => state.providerSlice);
  const [keyWord, setKeyWord] = useState("");
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
        <div className="search-container flex flex-col items-center md:flex-row justify-end gap-x-4 gap-y-2 w-full">
          <div className="inline-block font-semibold md:mr-auto text-base whitespace-nowrap">
            Danh sách nhà cung cấp
          </div>
          <Search
            className="min-w-min max-w-xs"
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

      <TableProviders data={providers} keyWord={keyWord} loading={loading} />
      <ModalForm />
    </>
  );
};

export default ProvidersPage;
