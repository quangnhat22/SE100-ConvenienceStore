import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "./containers/Admin/Login";
import AdminTemplate from "./layout/AdminLayout";
import { routesAdmin } from "./routes/AdminRoutes";
import "./index.css";

function App() {
  const renderRoutesAdmin = (routes) => {
    if (routes && routes.length > 0) {
      return routes.map((item, index) => {
        return (
          <AdminTemplate
            key={index}
            exact={item.exact}
            path={item.path}
            Component={item.component}
          />
        );
      });
    }
  }
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        {renderRoutesAdmin(routesAdmin)}
        {/* <Route component={PageNotFound}></Route> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
