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
  const { reports } = useSelector((state) => state.reportsSlice);
  const { staffs } = useSelector((state) => state.staffsSlice);
  const { listProduct } = useSelector((state) => state.productSlice);
  const [outOfStock, setOutOfStock] = useState(0);
  const [numberOfStaff, setNumberOfStaff] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [expiredSoon, setExpiredSoon] = useState(0);

  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    dispatch({ type: SagaActionTypes.GET_LIST_USER_SAGA });
  }, []);
  useEffect(() => {
    dispatch({ type: SagaActionTypes.GET_REPORT_YEAR_SAGA, year: year });
  }, [year]);
  useEffect(() => {
    dispatch({ type: SagaActionTypes.GET_LIST_PRODUCT_SAGA });
  }, []);

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
    console.log("reports", reports);
    var revenue = totalRevenue;
    if (reports.length === 0) return;
    else {
      reports.forEach((element) => {
        revenue = revenue + element.revenue;
      });
      setTotalRevenue(revenue);
    }
    setYear(year - 1);
  }, [reports]);

  useEffect(() => {
    console.log("listProduct", listProduct);
    var number = 0;
    var expiredSoon = 0;
    listProduct.forEach((element) => {
      if (element.quantity === 0) {
        ++number;
      }
      var startDay = element.EXP;
      var space = 0;
      while (moment(startDay).valueOf() < moment(Date.now()).valueOf()) {
        startDay = moment(startDay).add(1, "days");
        ++space;
      }
      if (space <= 10) {
        ++expiredSoon;
      }
    });
    setOutOfStock(number);
    setExpiredSoon(expiredSoon);
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
                /* onClick={() => handleCardProductDetail(source)} */
                className="text-blue-500 cursor-pointer hover:text-blue-600"
                to="products"
              >
                Chi tiết
              </Link>
            }
          >
            {/* <div className="font-bold text-2xl py-2">
              {productTypes + " loại"}
            </div> */}
            <div className="text-yellow-400 opacity-80 font-bold text-lg py-2">
              {"Sắp hết hạn: "}
              <span class="text-lg text-black">
                {expiredSoon
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
                /* onClick={() => handleCardStaffDetail(source)} */
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
                /* onClick={() => handleCardRevenueDetail(source)} */
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
        <div className="bg-white mt-10 md:mt-12 flex flex-col border-box shadow-md">
          {/* Biểu đồ */}
          <div className="m-5 box-border flex flex-wrap gap-y-10 gap-x-32">
            <div className="mr-x6-scroll-box-auto-hide flex flex-col grow gap-y-10">
              <div className="flex justify-end items-center">
                <span className="text-[25px] font-bold inline-block mr-auto">
                  Doanh thu tháng này
                </span>
                <span className="inline-block ml-5">
                  <Link
                    /* onClick={() => handleCardProductDetail(source)} */
                    className="text-blue-500 cursor-pointer hover:text-blue-600 hover:underline"
                    to="financial"
                  >
                    Xem thêm
                  </Link>
                </span>
              </div>
              <PieChart />
            </div>
            <div className="flex flex-col grow">
              <div className="flex justify-between items-center gap-10">
                <span className="text-[25px] font-bold inline-block font-2xl">
                  Bán chạy trong tuần
                </span>
                <span className="inline-block">
                  <Link
                    /* onClick={() => handleCardProductDetail(source)} */
                    className="text-blue-500 cursor-pointer hover:text-blue-600"
                    to="financial"
                  >
                    Xem thêm
                  </Link>
                </span>
              </div>
              <BestSellingTable />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
