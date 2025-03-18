import { StrictMode } from "react";
import "./assets/style/index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom'


ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
  document.getElementById("root"),
);