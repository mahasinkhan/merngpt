import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        width: "100%",
        padding: "30px 20px",
        backgroundColor: "#222",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderTop: "3px solid #64f3d5",
        boxShadow: "0px -4px 10px rgba(0, 0, 0, 0.4)",
      }}
    >
      {/* Decorative Line */}
      <div
        style={{
          width: "80px",
          height: "4px",
          backgroundColor: "#64f3d5",
          marginBottom: "15px",
        }}
      ></div>

      <p
        style={{
          fontSize: "18px",
          textAlign: "center",
          margin: 0,
          lineHeight: 1.5,
          fontWeight: "500",
        }}
      >
        Built with <span style={{ color: "#e63946" }}>❤️</span> by Mahasin Khan
      </p>

      {/* Social Media Links */}
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          gap: "15px",
        }}
      >
        <a
          href="#"
          className="social-icon"
          style={{
            color: "#64f3d5",
            fontSize: "20px",
            textDecoration: "none",
          }}
        >
          <i className="fab fa-facebook"></i>
        </a>
        <a
          href="#"
          className="social-icon"
          style={{
            color: "#64f3d5",
            fontSize: "20px",
            textDecoration: "none",
          }}
        >
          <i className="fab fa-twitter"></i>
        </a>
        <a
          href="#"
          className="social-icon"
          style={{
            color: "#64f3d5",
            fontSize: "20px",
            textDecoration: "none",
          }}
        >
          <i className="fab fa-instagram"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
