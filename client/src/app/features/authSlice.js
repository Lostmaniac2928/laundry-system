import { createSlice } from '@reduxjs/toolkit';

const getUserInfoFromStorage = () => {
  try {
    const userInfoString = localStorage.getItem('userInfo');
    return userInfoString ? JSON.parse(userInfoString) : null;
  } catch (error) {
    console.error("Failed to parse userInfo from localStorage", error);
    return null;
  }
};

const initialState = {
  userInfo: getUserInfoFromStorage(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action) {
      // *** THIS IS THE TEST ***
      console.log("--- INSIDE setCredentials ---");
      console.log("Payload received:", action.payload);

      state.userInfo = action.payload;
      try {
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
        console.log("--- Successfully set userInfo in localStorage ---");
      } catch (error) {
        console.error("--- FAILED to save userInfo to localStorage ---", error);
      }
    },
    logout(state) {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;