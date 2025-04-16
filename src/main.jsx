import { createRoot } from "react-dom/client";
import "./index.css";
import "remixicon/fonts/remixicon.css";
import { BrowserRouter } from "react-router";
import RoutePage from "./routes/RoutePage";
import { Provider } from "react-redux";
import { store } from "./redux/store";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <RoutePage />
    </BrowserRouter>
  </Provider>
);
