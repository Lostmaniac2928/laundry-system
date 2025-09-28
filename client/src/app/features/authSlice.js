import { createSlice } from '@reduxjs/toolkit';

// Function to get user info from local storage safely
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
      state.userInfo = action.payload;
      // This is the crucial part: saving the data to localStorage
      try {
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
      } catch (error) {
        console.error("Failed to save userInfo to localStorage", error);
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