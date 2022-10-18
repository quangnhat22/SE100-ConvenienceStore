import Search from 'antd/lib/input/Search';
import React from 'react';
import TableProducts from './components/TableProducts';

const ProductsPage = () => {
    
  return (
    <>
      <div className="ml-7 mt-5 mr-3 mb-5 flex flex-col justify-between items-center md:flex-row">
        <p className="font-semibold text-base">Danh sách đội</p>

        <div className="search-container flex flex-col items-center md:flex-row">
          <Search
            name="search"
            placeholder="Tìm kiếm"
            allowClear
            // onSearch={onSearch}
          />
          {/* button search */}
          <button 
          className="flex items-center justify-center rounded-md
                    bg-blue-600 h-8 w-40 p-2 ml-2 text-white  
                    mt-3 md:mt-0 hover:bg-blue-800" 
          // onClick={handleAddTeam}
          >
            Thêm đội
          </button>
        </div>
      </div>
      <TableProducts/>
      {/* <ModalForm /> */}
    </>
  )
}

export default ProductsPage