import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "./containers/Login";
import AdminTemplate from "./layout/AdminLayout";
import { routesAdmin } from "./routes/AdminRoutes";
import "./index.css";
import ForgotPasswordPage from "./containers/ForgotPassword";
import ResetPasswordPage from "./containers/ResetPassword";

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
  };
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/forgot-password" component={ForgotPasswordPage} />
        <Route
          exact
          path="/reset-password/"
          component={ResetPasswordPage}
        />
        {renderRoutesAdmin(routesAdmin)}
        {/* <Route component={PageNotFound}></Route> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
