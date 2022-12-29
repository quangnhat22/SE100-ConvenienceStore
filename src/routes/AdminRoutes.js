import DashBoard from "../containers/Admin/DashBoard";
import FinancialPage from "../containers/Admin/Financial";
import ProductsPage from "../containers/Admin/Products";
import ProfilePage from "../containers/Admin/Profile";
import SettingPage from "../containers/Admin/Setting";
import StaffsPage from "../containers/Admin/Staffs";
import ProvidersPage from "../containers/Admin/Providers";
import ProductLinesPage from "../containers/Admin/ProductLines";
import DeliveryNotes from "../containers/Admin/DeliveryNotes";
import DetailProductPage from "../containers/Admin/Products/components/DetailProductPage";
import Invoice from "../containers/Admin/Invoice";
import SalePage from "../containers/Staff/Sale";
import DetailProviderPage from "../containers/Admin/Providers/components/DetailProvider/DetailProviderPage";
import NewDeliveryNotePage from "../containers/Admin/DeliveryNotes/components/NewDeliveryNote/NewDeliveryNotePage";
import DeliveryNoteDetailPage from "../containers/Admin/DeliveryNotes/components/DeliveryNoteDetailPage";

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
    path: "/detail_product/:id",
    component: DetailProductPage,
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
    path: "/invoice",
    component: Invoice,
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
  },
  {
    exact: false,
    path: "/provider-detail-page/:id",
    component: DetailProviderPage,
  },
  {
    exact: false,
    path: "/new-delivery-note",
    component: NewDeliveryNotePage,
  },
  {
    exact: false,
    path: "/delivery-note-detail-page/:id",
    component: DeliveryNoteDetailPage,
  },
];

export { routesAdmin };
