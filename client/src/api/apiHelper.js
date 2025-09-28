const API_BASE_URL = import.meta.env.VITE_API_URL || '';

// Function to get the token from localStorage
const getToken = () => {
  try {
    const userInfoString = localStorage.getItem('userInfo');
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      return userInfo.token;
    }
    return null;
  } catch (error) {
    console.error("Could not parse user info from localStorage", error);
    return null;
  }
};

// Our new fetch function
export const apiFetch = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};