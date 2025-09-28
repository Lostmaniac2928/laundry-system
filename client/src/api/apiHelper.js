const API_BASE_URL = import.meta.env.VITE_API_URL || '';

const getToken = () => {
  // *** DIAGNOSTIC LOG 1 ***
  console.log("Step 1: Running getToken function...");
  try {
    const userInfoString = localStorage.getItem('userInfo');
    console.log("Step 2: Found userInfo string in localStorage:", userInfoString);
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      console.log("Step 3: Parsed userInfo object:", userInfo);
      console.log("Step 4: Returning token:", userInfo.token);
      return userInfo.token;
    }
    console.log("Step 3 & 4: No userInfo string found, returning null.");
    return null;
  } catch (error) {
    console.error("ERROR in getToken:", error);
    return null;
  }
};

export const apiFetch = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // *** DIAGNOSTIC LOG 2 ***
  console.log(`Step 5: Preparing to fetch endpoint: ${endpoint}`);
  if (token) {
    headers.Authorization = `Bearer ${token}`;
    console.log("Step 6: Authorization header IS SET.");
  } else {
    console.log("Step 6: Authorization header IS NOT SET.");
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