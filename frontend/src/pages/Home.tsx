import React from "react";
import { Box} from "@mui/material";
import TypingAnim from "../components/typer/TypingAnim";
import { useTheme, useMediaQuery } from "@mui/material";
import Footer from "../components/footer/Footer";

const Home = () => {
  const theme = useTheme();
const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      width="100%"
      height="100vh" // Use the full viewport height for the main container
      sx={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden", // Prevent any unnecessary scrolling
      }}
    >
      {/* Typing Animation Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "50vh", // Adjust height to limit content size
          textAlign: "center",
        }}
      >
        <TypingAnim />
      </Box>

      {/* Images Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column", // Stack vertically on small screens
          justifyContent: "center",
          alignItems: "center",
          gap: { md: 4, xs: 2 }, // Adjust gap for responsiveness
          marginBottom: 5, // Space before chatbot image
          overflow: "hidden", // Prevent overflow here as well
        }}
      >
        {/* Robot and OpenAI Images */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { md: "row", xs: "column" }, // Stack horizontally on larger screens
            justifyContent: "center",
            alignItems: "center",
            gap: { md: 5, xs: 2 }, // Responsive gap
          }}
        >
          <img
            src="/owen-beard-K21Dn4OVxNw-unsplash.jpg"
            alt="robot"
            style={{
              width: "100%",
              maxWidth: "200px",
              borderRadius: "10px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            }}
          />
          <img
            className="image-inverted rotate"
            src="https://openai.com/favicon.ico"
            alt="openai"
            style={{
              width: "100%",
              maxWidth: "200px",
              borderRadius: "10px",
              animation: "rotation 8s infinite linear",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            }}
          />
        </Box>
      </Box>

      {/* Chatbot Image */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px", // Ensure there's space above
        }}
      >
        <img
          src="/chatbot.jpg"
          alt="chatbot"
          style={{
            width: "100%",
            maxWidth: "400px",
            borderRadius: "20px",
            boxShadow: "-5px -5px 105px #64f3d5",
          }}
        />
      </Box>
      <Footer />
    </Box>
  );
};

export default Home;
