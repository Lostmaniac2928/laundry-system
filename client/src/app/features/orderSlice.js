import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMyOrders as fetchMyOrdersApi, createOrder as createOrderApi } from '../../api/orderApi';
import { getAllOrders as fetchAllOrdersApi, updateOrderStatus as updateOrderStatusApi } from '../../api/adminApi';

// --- Thunks ---
export const fetchMyOrders = createAsyncThunk('orders/fetchMyOrders', async (_, { rejectWithValue }) => {
    try { return await fetchMyOrdersApi(); } catch (error) { return rejectWithValue(error.response.data.message); }
});
export const createOrder = createAsyncThunk('orders/createOrder', async (orderData, { rejectWithValue }) => {
    try { return await createOrderApi(orderData); } catch (error) { return rejectWithValue(error.response.data.message); }
});
export const fetchAllOrders = createAsyncThunk('orders/fetchAllOrders', async (_, { rejectWithValue }) => {
    try { return await fetchAllOrdersApi(); } catch (error) { return rejectWithValue(error.response.data.message); }
});
export const updateOrderStatus = createAsyncThunk('orders/updateStatus', async ({ id, status }, { rejectWithValue }) => {
    try { return await updateOrderStatusApi(id, status); } catch (error) { return rejectWithValue(error.response.data.message); }
});

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // --- All .addCase() calls must come first ---
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orders.unshift(action.payload);
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.orders.findIndex(o => o._id === action.payload._id);
        if (index !== -1) {
            state.orders[index] = action.payload;
        }
      })
      // --- All .addMatcher() calls must come last ---
      .addMatcher(
        (action) => [fetchMyOrders.pending, fetchAllOrders.pending].includes(action.type),
        (state) => { 
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => [fetchMyOrders.fulfilled, fetchAllOrders.fulfilled].includes(action.type),
        (state, action) => {
            state.loading = false;
            state.orders = action.payload;
        }
      )
      .addMatcher(
        (action) => [fetchMyOrders.rejected, fetchAllOrders.rejected, createOrder.rejected, updateOrderStatus.rejected].includes(action.type),
        (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
      );
  },
});

export default orderSlice.reducer;