import { createSlice } from "@reduxjs/toolkit";


//this initial state is manage for redux for the ui management puppose here i have used user and auth
//if token is there is there in local staroage that means user is logined so thaht conditional statement is used
const initialState = {
  user: {},
  auth: localStorage.getItem("userTokenBuyCars") ? true : false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,//this is the initial state for the redux state

  //these reducers obj has actions like setUser ang logout user which perform setting of user in fronted redux
  //when callded and logout them as well

  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
      state.auth = true;
    },
    logoutUser: (state) => {
      state.user = {};
      state.auth = false;
    },
  },
});

export const { logoutUser, setUser } = authSlice.actions;

const authSliceReducer = authSlice.reducer;
//after that we are export the authSlice reducer obje and useing it in store
export default authSliceReducer;
