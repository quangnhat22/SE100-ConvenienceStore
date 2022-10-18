import "./index.css";
import LayoutAdmin from "./containers/Template";
import Routes from "./routes";
function App() {
  return (
    <LayoutAdmin>
      <Routes></Routes>
    </LayoutAdmin>
  );
}

export default App;