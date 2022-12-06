import DashBoard from "../containers/Admin/DashBoard";
import FinancialPage from "../containers/Admin/Financial";
import ProductsPage from "../containers/Admin/Products";
import ProfilePage from "../containers/Admin/Profile";
import SettingPage from "../containers/Admin/Setting";
import StaffsPage from "../containers/Admin/Staffs";
import ProvidersPage from "../containers/Admin/Providers";
import ProductLinesPage from "../containers/Admin/ProductLines";
import DeliveryNotes from "../containers/Admin/DeliveryNotes";

const routesAdmin = [
  {
    exact: false,
    path: "/dash-board",
    component: DashBoard,
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
    path: "/profile",
    component: ProfilePage,
  },
  {
    exact: false,
    path: "/setting",
    component: SettingPage,
  },
  {
    exact: false,
    path: "/providers",
    component: ProvidersPage,
  },
  {
    exact: false,
    path: "/productlines",
    component: ProductLinesPage,
  },
  {
    exact: false,
    path: "/delivery_notes",
    component: DeliveryNotes,
  },
  {
    exact: false,
    path: "/sales",
    component: StaffsPage,
  },
];

export { routesAdmin };
