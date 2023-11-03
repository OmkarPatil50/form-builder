import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { DragDropContext } from "react-beautiful-dnd";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <DragDropContext>
      <Provider store={store}>
        <App />
      </Provider>
    </DragDropContext>
  </Router>
);

reportWebVitals();
