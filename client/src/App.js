import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AllRoutes from "./Components/AllRoutes";
import Navbar from "./Components/Navbar";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Api_Link } from "./Components/Reusable";

import { useDispatch } from "react-redux";
import { logoutUser, setUser } from "./Redux/authSlice";

import LayerComponent from "./Components/LayerComponent";

function App() {

  const dispatch = useDispatch();

  const getUserData = async () => {

    //here on initial render i am checking if the token is there than call the use data from the backnd user it in this redux 
    //so that throught out the app we can use any whre

    const token = localStorage.getItem("userTokenBuyCars");
    if (!token) return;

    let decoded = jwt_decode(token);
    let { data } = await axios.get(`${Api_Link}/user/${decoded.id}`);
    if (!data.user) {
      //if data is not there menas user is not in database so make user token remove and logout him/her
      localStorage.removeItem("userTokenBuyCars")

      dispatch(logoutUser());
    } else {
      dispatch(setUser(data.user));
    }
    try {
    } catch (error) {}
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div className="App">
      <Navbar />
      <LayerComponent/>
      <AllRoutes />
      <ToastContainer />
    </div>
  );
}

export default App;
