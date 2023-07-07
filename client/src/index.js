import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "./Redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //this provider is for the redux so the app can used all the store state of the redux
  <Provider store={store}>
    <ChakraProvider>
      {/* this rapping from chakra provider is used to get the css and ui components for the ChakraProvider for good ui */}
      <BrowserRouter>
      {/* browser router is used to route through different pages  */}
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
