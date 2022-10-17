import FinancialPage from "../containers/Admin/Financial";
import ProductsPage from "../containers/Admin/Products";
import SettingPage from "../containers/Admin/Setting";
import StaffsPage from "../containers/Admin/Staffs";
import PageTest from "../pages/pagetest";

const routesAdmin = [
    {
      exact: false,
      path: "/dash-board",
      component: PageTest,
    },
    {
      exact: false,
      path: "/products",
      component: ProductsPage,
    },
    {
      exact: false,
      path: "/staffs",
      component: StaffsPage,
    },
    {
      exact: false,
      path: "/financial",
      component: FinancialPage,
    },
    {
      exact: false,
      path: "/setting",
      component: SettingPage,
    },
  ];
  
  export { routesAdmin };