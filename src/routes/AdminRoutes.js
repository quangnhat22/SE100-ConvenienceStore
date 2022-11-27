import DashBoard from "../containers/Admin/DashBoard";
import FinancialPage from "../containers/Admin/Financial";
import ProductsPage from "../containers/Admin/Products";
import ProfilePage from "../containers/Admin/Profile";
import SettingPage from "../containers/Admin/Setting";
import StaffsPage from "../containers/Admin/Staffs";
import ProvidersPage from "../containers/Admin/Providers";
import DetailProviderPage from "../containers/Admin/Providers/components/DetailProviderPage";
import AddProviderPage from "../containers/Admin/Providers/components/AddProviderPage";
import ProductLinesPage from "../containers/Admin/ProductLines";

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
    path: "/detail_provider/:id",
    component: DetailProviderPage,
  },
  {
    exact: false,
    path: "/add_provider",
    component: AddProviderPage,
  },
  {
    exact: false,
    path: "/productlines",
    component: ProductLinesPage,
  },
];

export { routesAdmin };
