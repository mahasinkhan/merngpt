import React from 'react';
import { TypeAnimation } from 'react-type-animation'; // Import TypeAnimation

const TypingAnim = () => {
  return (
    <TypeAnimation
      sequence={[
        "Chat with your OWN AI 🤖",
        1000,
        "Build with OpenAI 🛠️🤖",
        2000,
        "Your own Customized ChatGPT 🧠💬",
        1500,
      ]}
      wrapper="span"
      speed={50}
      cursor={true}
      repeat={Infinity}
      style={{
        fontSize: "60px",
        color: "white",
        textShadow: "1px 1px 20px #000",
        display: "inline-block",
        textAlign: "center", // Align text centrally in the box
      }}
    />
  );
};

export default TypingAnim;
