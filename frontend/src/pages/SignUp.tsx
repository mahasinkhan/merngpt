import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name || !email || !password) {
      toast.error("All fields are required!");
      return;
    }

    try {
      toast.loading("Signing Up...", { id: "signup" });
      await auth?.signup(name, email, password); // Call the signup function
      toast.success("Signed Up Successfully", { id: "signup" });
      navigate("/chat");
    } catch (error) {
      console.error("Error during sign-up:", error);
      toast.error("Sign-up failed", { id: "signup" });
    }
  };

  useEffect(() => {
    if (auth?.user) {
      navigate("/chat");
    }
  }, [auth, navigate]);

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

      {/* Right Section: Signup Form */}
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
          Sign Up
        </Typography>

        {/* Form */}
        <form
          style={{ width: "100%", maxWidth: "400px" }}
          onSubmit={handleSubmit}
        >
          <Box sx={{ marginBottom: 3 }}>
            <CustomizedInput type="text" name="name" label="Name" />
          </Box>
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
            Sign Up
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default SignUp;
