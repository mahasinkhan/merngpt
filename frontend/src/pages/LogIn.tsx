import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import {toast} from 'react-hot-toast';
import { useAuth } from "../context/AuthContext";
import {  useNavigate } from "react-router-dom";

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    // Get form data
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
  
    if (!email || !password) {
      console.error("Email or Password is missing");
      return;
    }
  
    try {
      toast.loading("Signing In", { id: "login" });
      await auth?.login(email, password); // Call the login function
      toast.success("Signed In Successfully", { id: "login" });
      console.log("Login successful");
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Signing In failed", { id: "login" });
    }
  };

  useEffect(() => {
    if (auth?.user) {
      navigate("/chat"); // Use the navigate function
    }
  }, [auth, navigate]); // Include navigate as a dependency


  return (
    <Box
      width="100%"
      height="100vh"
      display="flex"
      flexDirection={{ xs: "column", sm: "row" }}
      alignItems="center"
      justifyContent="center"
      bgcolor="#05101c"
    >
      {/* Left Section: Image */}
      <Box
        padding={8}
        mt={8}
        display={{ md: "flex", sm: "none", xs: "none" }}
        justifyContent="center"
      >
        <img
          src="\pexels-onewayupdesigns-2085831.jpg"
          alt="Robot"
          style={{
            width: "400px",
            maxWidth: "100%",
            borderRadius: "10px",
          }}
        />
      </Box>

      {/* Right Section: Login Form */}
      <Box
        flex={{ xs: 1, md: 0.5 }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        padding={4}
        boxShadow="0px 4px 20px rgba(0,0,0,0.1)"
        borderRadius="10px"
      >
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight={600}
          sx={{ marginBottom: 2, color: "#ffffff" }}
        >
          Login
        </Typography>

        {/* Form with onSubmit */}
        <form
          style={{ width: "100%", maxWidth: "400px" }}
          onSubmit={handleSubmit}
        >
          <Box sx={{ marginBottom: 3 }}>
            <CustomizedInput type="email" name="email" label="Email" />
          </Box>
          <Box sx={{ marginBottom: 3 }}>
            <CustomizedInput type="password" name="password" label="Password" />
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#00fffc",
              color: "white",
              px: 2,
              py: 1,
              width: "400px",
              borderRadius: 2,
              fontSize: "1rem",
              ":hover": {
                bgcolor: "white",
                color: "black",
              },
            }}
          >
            LogIn
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
