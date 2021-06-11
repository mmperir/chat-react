import "fontsource-roboto";
import { BrowserRouter } from "react-router-dom";
import "./app.scss";
import Routes from "./routes";

function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
