/** @format */

import "./styles/global.css";

import { Provider } from "react-redux";
import store from "@/redux/store"; // Import your Redux store

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
