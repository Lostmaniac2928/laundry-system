import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getServices as fetchServicesApi } from '../../api/serviceApi';
import { 
  createService as createServiceApi,
  updateService as updateServiceApi,
  deleteService as deleteServiceApi,
} from '../../api/adminApi';

// --- ASYNC THUNKS ---

export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchServicesApi();
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createService = createAsyncThunk(
  'services/createService',
  async (serviceData, { rejectWithValue }) => {
    try {
      return await createServiceApi(serviceData);
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Failed to create service');
    }
  }
);

export const updateService = createAsyncThunk(
  'services/updateService',
  async ({ id, serviceData }, { rejectWithValue }) => {
    try {
      return await updateServiceApi(id, serviceData);
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Failed to update service');
    }
  }
);

export const deleteService = createAsyncThunk(
  'services/deleteService',
  async (id, { rejectWithValue }) => {
    try {
      await deleteServiceApi(id);
      return id; // Return the id on success
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Failed to delete service');
    }
  }
);

// --- SLICE DEFINITION ---

const initialState = {
  services: [],
  loading: false,
  error: null,
};

const serviceSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // --- All .addCase() calls must come first ---
      .addCase(fetchServices.pending, (state) => { state.loading = true; })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.services.unshift(action.payload);
      })
      .addCase(updateService.fulfilled, (state, action) => {
        const index = state.services.findIndex(s => s._id === action.payload._id);
        if (index !== -1) {
          state.services[index] = action.payload;
        }
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.services = state.services.filter(s => s._id !== action.payload);
      })
      // --- The .addMatcher() call comes last ---
      .addMatcher(
        (action) => [fetchServices.rejected, createService.rejected, updateService.rejected, deleteService.rejected].includes(action.type),
        (state, action) => {
            state.loading = false;
            state.error = action.payload.message || action.payload;
        }
      );
  },
});

export default serviceSlice.reducer;