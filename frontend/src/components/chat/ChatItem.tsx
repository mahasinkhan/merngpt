import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Extract code blocks and plain text blocks from a message
function extractCodeFromString(message: string): string[] {
  if (message.includes("```")) {
    return message.split("```").filter((block) => block.trim() !== "");
  }
  return [message]; // Return the full message if no code blocks are found
}

// Determine if a block is likely a code block
function isCodeBlock(str: string): boolean {
  const codeIndicators = ["=", ";", "[", "]", "{", "}", "#", "//"];
  return codeIndicators.some((indicator) => str.includes(indicator));
}

const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "assistant";
}) => {
  const messageBlocks = extractCodeFromString(content);
  const auth = useAuth();

  return role === "assistant" ? (
    <Box sx={{ display: "flex", p: 2, bgcolor: "#004d5612", my: 2, gap: 2 }}>
      {/* Avatar for Assistant */}
      <Avatar sx={{ ml: "0" }}>
        <img src="https://openai.com/favicon.ico" alt="openai" width="30px" />
      </Avatar>

      {/* Assistant's Message */}
      <Box>
        {messageBlocks.map((block, index) =>
          isCodeBlock(block) ? (
            <SyntaxHighlighter
              key={index}
              style={darcula}
              language="javascript"
            >
              {block}
            </SyntaxHighlighter>
          ) : (
            <Typography key={index} sx={{ fontSize: "20px" }}>
              {block}
            </Typography>
          )
        )}
      </Box>
    </Box>
  ) : (
    <Box sx={{ display: "flex", p: 2, bgcolor: "#004d56", my: 2, gap: 2 }}>
      {/* Avatar for User */}
      <Avatar sx={{ ml: "0", bgcolor: "black", color: "white" }}>
        {auth?.user?.name?.split(" ")[0]?.[0]} {auth?.user?.name?.split(" ")[1]?.[0]}
      </Avatar>

      {/* User's Message */}
      <Box>
        <Typography sx={{ color: "black" }}>{content}</Typography>
      </Box>
    </Box>
  );
};

export default ChatItem;
