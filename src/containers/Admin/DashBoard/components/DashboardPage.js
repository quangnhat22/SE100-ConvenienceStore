import React, { useState, useEffect } from "react";
import { Card } from "antd";
import "../../../../common/Segmented/Segmented.css";
import PieChart from "./PieChart";
import "../../../../common/Table/TableTemplate.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BestSellingTable from "./BestSellingTable";
import * as SagaActionTypes from "../../../../redux/constants/constant";
import moment from "moment";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { reportsYear } = useSelector((state) => state.reportsSlice);
  const { staffs } = useSelector((state) => state.staffsSlice);
  const { listProduct } = useSelector((state) => state.productSlice);
  const [outOfStock, setOutOfStock] = useState(0);
  const [numberOfStaff, setNumberOfStaff] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const [year, setYear] = useState(new Date().getFullYear());
  const [productNumber, setProductNumber] = useState(0);
  useEffect(() => {
    dispatch({ type: SagaActionTypes.GET_REPORT_YEAR_SAGA, year: year });
  }, [year]);

  useEffect(() => {
    console.log("staffs", staffs);
    var number = 0;
    staffs.forEach((element) => {
      if (element.role === "EMPLOYEE") {
        ++number;
      }
    });
    setNumberOfStaff(number);
  }, [staffs]);

  useEffect(() => {
    console.log("reports", reportsYear);
    var revenue = totalRevenue;
    if (reportsYear.length === 0) return;
    else {
      reportsYear.forEach((element) => {
        revenue = revenue + element.revenue;
      });
      setTotalRevenue(revenue);
    }
    setYear(year - 1);
  }, [reportsYear]);

  useEffect(() => {
    var number = 0;
    var product = 0;
    listProduct.forEach((element) => {
      ++product;
      if (element.quantity === 0) {
        ++number;
      }
    });
    setOutOfStock(number);
    setProductNumber(product);
  }, [listProduct]);

  return (
    <>
      <div className="mt-2 mx-2 md:mt-6 md:mx-12">
        <div className="flex flex-wrap gap-10">
          {/* Card sản phẩm */}
          <Card
            className="w-80 shadow-md rounded grow"
            size="small"
            title="Sản phẩm"
            headStyle={{ fontWeight: "bold", fontSize: "25px" }}
            extra={
              <Link
                className="text-blue-500 cursor-pointer hover:text-blue-600"
                to="products"
              >
                Chi tiết
              </Link>
            }
          >
            <div className="text-yellow-400 opacity-80 font-bold text-lg py-2">
              {"Đang kinh doanh: "}
              <span class="text-lg text-black">
                {productNumber
                  .toString()
                  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
              </span>
            </div>
            <div className="text-red-500 font-bold text-lg py-2">
              {"Hết hàng: "}
              <span class="text-lg text-black">
                {outOfStock
                  .toString()
                  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
              </span>
            </div>
          </Card>

          {/* Card nhân viên */}
          <Card
            className="w-80 shadow-md rounded grow"
            size="small"
            title="Nhân viên"
            headStyle={{ fontWeight: "bold", fontSize: "25px" }}
            extra={
              <Link
                to="/staffs"
                className="text-blue-500 cursor-pointer hover:text-blue-600"
              >
                Chi tiết
              </Link>
            }
          >
            <div className="font-bold text-lg py-2">
              {numberOfStaff
                .toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + " người"}
            </div>
          </Card>

          {/* Card tổng doanh thu */}
          <Card
            className="w-80 shadow-md rounded grow"
            size="small"
            title="Tổng doanh thu"
            headStyle={{ fontWeight: "bold", fontSize: "25px" }}
            extra={
              <Link
                className="text-blue-500 cursor-pointer hover:text-blue-600"
                to="financial"
              >
                Chi tiết
              </Link>
            }
          >
            <div className="font-bold text-lg py-2">
              {totalRevenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                " VNĐ"}
            </div>
          </Card>
        </div>
        {/* Bảng biểu */}
        <div className="bg-white flex flex-wrap mt-10 md:mt-12 shadow-md min-h-[400px] gap-20 p-3 justify-between">
          {/* Biểu đồ */}
          <div className="flex flex-col justify-center sm:w-[800px] sm:h-[600px] grow">
            <div className="flex justify-between gap-5 ">
              <span className="text-[25px] font-bold inline-block">
                Doanh thu tháng này
              </span>
              <span className="inline-block whitespace-nowrap">
                <Link
                  className="text-blue-500 cursor-pointer hover:text-blue-600 whitespace-nowrap"
                  to="financial"
                >
                  Xem thêm
                </Link>
              </span>
            </div>
            <PieChart />
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between items-center gap-5">
              <span className="text-[25px] font-bold inline-block whitespace-nowrap">
                Bán chạy trong tuần
              </span>
              <span className="inline-block whitespace-nowrap">
                <Link
                  className="text-blue-500 cursor-pointer hover:text-blue-600"
                  to="financial"
                >
                  Xem thêm
                </Link>
              </span>
            </div>
            <BestSellingTable className="grow" />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
