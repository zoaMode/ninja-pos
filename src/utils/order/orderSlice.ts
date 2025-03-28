import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "./orderService";
import Order from "./IOrder";
import OrderModel from "./IOrderModel";
import OrderUpdateModel from "./IOrderUpdateModel";

interface OrderState {
  orders: Order[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: OrderState = {
  orders: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getOrders = createAsyncThunk(
  "order/getOrders",
  async (_, thunkAPI) => {
    try {
      return await orderService.getOrders();
    } catch (e: any) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData: OrderModel[], thunkAPI) => {
    try {
      return await orderService.createOrder(orderData);
    } catch (e: any) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async (orderUpdate: OrderUpdateModel[], thunkAPI) => {
    try {
      return await orderService.updateOrder(orderUpdate);
    } catch (e: any) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteOrder = createAsyncThunk(
	"order/deleteOrder",
	async (orderId: number, thunkAPI) => {
		try {
			return await orderService.deleteOrder(orderId);
		} catch (e: any) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(message);
    }
	}
);

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // getOrders
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })

      // createOrder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Success adding order!";
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })

      // ✅ updateOrder
      .addCase(updateOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrder.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Order updated successfully!";
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })

      // ✅ deleteOrder
      .addCase(deleteOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteOrder.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Order deleted successfully!";
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = orderSlice.actions;
export default orderSlice.reducer;
