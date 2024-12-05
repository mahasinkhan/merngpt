import axios from "axios";



// Login function
export const loginUser = async (email: string, password: string) => {
  try {
    const res = await axios.post("/user/login", { email, password });

    if (res.status !== 200) {
      throw new Error("Unable to login");
    }

    return res.data; // Return the data directly
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "An error occurred during login.");
  }
};

// signup function
export const signupUser = async ( name:string , email: string, password: string) => {
  try {
    const res = await axios.post("/user/signup", { email, password });

    if (res.status !== 200) {
      throw new Error("Unable to login");
    }

    return res.data; // Return the data directly
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "An error occurred during login.");
  }
};



// Check authentication status
export const checkAuthStatus = async () => {
  try {
    const res = await axios.get("/user/auth-status"); 

    if (res.status !== 200) {
      throw new Error("Unable to authenticate");
    }

    return res.data; // Return the data directly
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "An error occurred during authentication.");
  }
};

// Send a new chat request
export const sendChatRequest = async (message: string) => {
  console.log("Sending chat request with message:", message);
  try {
    const res = await axios.post("/chat/new", { message });

    console.log("Response received:", res.data);

    if (res.status !== 200) {
      throw new Error("Unable to send chat");
    }

    return res.data; // Return the chat data
  } catch (error: any) {
    console.error("Error in sendChatRequest:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "An error occurred while sending the chat.");
  }
};

// Get all user chats
export const getUserChats = async () => {
  try {
    const res = await axios.get("/chat/all-chats");
    console.log("Response received:", res.data);

    if (res.status !== 200) {
      throw new Error("Unable to fetch chats");
    }

    return res.data; // Return the chat data
  } catch (error: any) {
    console.error("Error in getUserChats:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "An error occurred while fetching chats.");
  }
};

// Delete user chats
export const deleteUserChats = async () => {
  try {
    const res = await axios.delete("/chat/delete");
    console.log("Response received:", res.data);

    if (res.status !== 200) {
      throw new Error("Unable to delete chats");
    }

    return res.data; // Return the chat data
  } catch (error: any) {
    console.error("Error in deleteUserChats:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "An error occurred while deleting chats.");
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    const res = await axios.delete("/user/logout");
    console.log("Response received:", res.data);

    if (res.status !== 200) {
      throw new Error("Unable to log out");
    }

    return res.data; // Return the response data
  } catch (error: any) {
    console.error("Error in logoutUser:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "An error occurred while logging out.");
  }
};
