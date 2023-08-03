import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//Object ko freeze isiliye kiya taki koi status.IDLE karke status change na karpaaye!
export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

export const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    status: STATUSES.IDLE,
  },
  reducers: {
    // const response = await axios.get(`https://fakestoreapi.com/products`);
    //Never Ever Do This because you cannot do async call in reducers because they are synchrounous and pure functions and they cannot have side effect and API call can be a side effect
    /*
    A pure function is a function that always produces the same output for the same input and has no observable side effects. In other words, its behavior is entirely determined by its input parameters, and it doesn't modify external state or rely on external data.
    */
    // Instead We Do use of Thunks
    setProducts(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { setProducts, setStatus } = productSlice.actions;
export default productSlice.reducer;

//Thunks
//Already Configured in ReduxToolkit!
// Thunks are a middleware concept in Redux that allow you to write asynchronous logic in a more organized and structured manner. They are a way to handle asynchronous actions and side effects, such as making API calls, in Redux applications.
//Middleware in Redux is a powerful concept that allows you to intercept, modify, or handle actions and their payloads before they reach the reducers.
//Thunk is a programming word that means "a piece of code that does some delayed work".

//Example
//Thunk ek normal function hoti hai
//aur us function se ek function return karni hoti hai!
//Ye kahasiyat hai thunk ki!
//ab us andar wale function ke andar 2 paramter reciver hote hai!
// 1.. Dispatch 2.. getState
// Ab axios.get se data milgaya,now dispacth function jo hai ,ab action dipatch karege jo hai upar mai likhi setProducts
// Before setting data we want loading also
//For that dispatch(setStatus(STATUSES.LOADING));
export function fetchProducts() {
  return async function fetchProductThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const res = await axios.get(`https://fakestoreapi.com/products`);
      dispatch(setProducts(res.data));
      dispatch(setStatus(STATUSES.IDLE));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}
