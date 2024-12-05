import React, { createContext, useState, ReactNode, useEffect } from "react";
import { checkAuthStatus, loginUser, logoutUser, signupUser } from "../helpers/api-communicators";


// Define the User type
type User = {
  name: string;
  email: string;
};

// Define the UserAuth type
type UserAuth = {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function checkStatus() {
      try {
        const data = await checkAuthStatus();
        if (data) {
          setUser({ email: data.email, name: data.name });
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      }
    }
    checkStatus();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const data = await loginUser(email, password);
      if (data) {
        setUser({ email: data.email, name: data.name });
        setIsLoggedIn(true);
        console.log("Login successful:", data);
      }
    } catch (error: any) {
      console.error("Login failed:", error.message);
      // Optionally show an error message to the user
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const data = await signupUser(name, email, password);
      if (data) {
        setUser({ name: data.name, email: data.email });
        setIsLoggedIn(true);
        console.log("Signup successful:", data);
      }
    } catch (error: any) {
      console.error("Signup failed:", error.message);
      // Optionally show an error message to the user
    }
  };
  

  const logout = async () => {
    try {
      await logoutUser();
      setIsLoggedIn(false);
      setUser(null);
      window.location.reload(); // Optional: to refresh the page after logout
    } catch (error: any) {
      console.error("Logout failed:", error.message);
    }
  };

  const value = {
    user,
    isLoggedIn,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use authentication context
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
