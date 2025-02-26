import { configureStore } from "@reduxjs/toolkit";
import productSkuReducer from "./productSku/productSkuSlice";
import productReducer from "./product/productSlice";
import clientReducer from "./client/clientSlice";
import orderDetailReducer from "./orderDetail/orderDetailSlice";
import orderReducer from "./order/orderSlice";

export const store = configureStore({
  reducer: {
    productSku: productSkuReducer,
    products: productReducer,
    clients: clientReducer,
    orderDetails: orderDetailReducer,
    orders: orderReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
