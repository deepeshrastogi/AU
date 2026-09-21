import { createSlice } from "@reduxjs/toolkit";

const savedOrders =
  localStorage.getItem("orders");

const initialState = {
  orders: savedOrders
    ? JSON.parse(savedOrders)
    : [],
};

const orderSlice = createSlice({
  name: "orders",

  initialState,

  reducers: {
    createOrder: (state, action) => {
      state.orders.push(action.payload);

      localStorage.setItem(
        "orders",
        JSON.stringify(state.orders)
      );
    },
  },
});

export const { createOrder } =
  orderSlice.actions;

export default orderSlice.reducer;