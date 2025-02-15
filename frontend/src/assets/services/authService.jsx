// authService.js

export const loginUser = async (credentials) => {
  try {
    // Replace this with an actual API call
    if (
      credentials.username === "admin" &&
      credentials.password === "password"
    ) {
      return {
        success: true,
        token: "fake-jwt-token",
        message: "Login successful!",
      };
    } else {
      return { success: false, message: "Invalid username or password." };
    }
  } catch (error) {
    return { success: false, message: "Something went wrong. Try again!" };
  }
};

export const logoutUser = () => {
  // Clear token (if using localStorage)
  localStorage.removeItem("authToken");
};
