import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import HttpClient from "../../helpers/HttpClient";

// 2. Asynchronous Thunks

// Thunk to fetch order data
export const fetchOrdersData = createAsyncThunk(
  "order/fetch",
  async (_, { getState, rejectWithValue }) => {
    try {
      const response = await HttpClient.get("/orders");
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Thunk to add order data
export const addOrdersData = createAsyncThunk(
  "order/add",
  async (formData, { getState, rejectWithValue }) => {
    try {
      const response = await HttpClient.post("/orders", formData);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// 3. Order Slice Definition

const orderSlice = createSlice({
  name: "order",
  initialState: {
    data: [],
    error: null, // Added error to handle any errors that might occur
  },
  reducers: {
    // Add your synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchOrdersData fulfilled state
      .addCase(fetchOrdersData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
      })
      // Handle addOrdersData fulfilled state
      .addMatcher(
        (action) => [addOrdersData.fulfilled].includes(action.type),
        (state) => {
          state.error = null;
        }
      )
      // Handle rejected states for both fetchOrdersData and addOrdersData
      .addMatcher(
        (action) =>
          [addOrdersData.rejected, fetchOrdersData.rejected].includes(
            action.type
          ),
        (state, action) => {
          state.error = action.error.message || "An error occurred";
        }
      );
  },
});

// 4. Export the order reducer
export default orderSlice.reducer;
