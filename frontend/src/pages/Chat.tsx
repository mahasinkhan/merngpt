import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import red from '@mui/material/colors/red';
import { Box, Avatar, Typography, Button,IconButton } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import ChatItem from '../components/chat/ChatItem';  // Import ChatItem
import {IoMdSend} from 'react-icons/io';
import { deleteUserChats, getUserChats, sendChatRequest } from '../helpers/api-communicators';
import { useAsyncValue } from 'react-router-dom';
import toast from 'react-hot-toast';

import {useNavigate} from 'react-router-dom';

type Message ={
  role: 'user' | 'assistant';
  content: string;
}
const Chat = () => {

  const navigate=useNavigate();
  const inputRef=useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const [chatMessages,setChatMessages]=useState<Message[]>([]);

  const handleSubmit = async () => {
    const content = inputRef.current?.value?.trim(); // Ensure the content is trimmed
    if (!content) return; // Prevent submitting empty messages
  
    // Clear the input field
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  
    // Add the user's message to the chatMessages state
    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);
  
    try {
      // Send the user's message to the backend and get the response
      const chatData = await sendChatRequest(content);
  
      // Append the chatbot's response to the chatMessages state
      setChatMessages((prev) => [...prev, ...chatData.chats]);
    } catch (error:any) {
      console.error("Error sending chat request:", error.message);
  
      // Optionally, you can add an error message to the chat
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, I couldn't process your request. Please try again later.",
      };
      setChatMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleDeleteChats = async()=>{
    try {
      toast.loading("Deleting chats",{id:"deletechats"});
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Deleted chats Successfully",{id:"deletechats"});

    } catch (error) {
      console.log(error);
      toast.error("Deleting chats  fails",{id:"deletechats"});
      
      
    }

  };

  useLayoutEffect(()=>{
    if(auth?.isLoggedIn && auth.user){
      toast.loading("Loading chats",{id:"loadchats"});
      getUserChats().then((data)=>{
        setChatMessages([...data.chats]);
        toast.success("Successfully Loaded chats",{id:"loadchats"});
      }).catch((err)=>{
        console.log(err);
        toast.error("Loading failed",{id:"loadchats"});
      })
    }

  },[auth]);

  useEffect(()=>{
    if(!auth?.user){
      return navigate("/login");
    }
  },[]);
  
  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        width: '100%',
        height: '100%',
        mt: 3,
        gap: 3,
      }}
    >
      {/* Chat window section */}
      <Box
        sx={{
          display: { md: 'flex', xs: 'none', sm: 'none' }, flex: 0.2, flexDirection: 'column' // Flex on desktop, hide on mobile
        }}
      >
        <Box
          sx={{
            flexDirection: 'column',
            width: '100%',
            height: '60vh',  // Responsive height
            bgcolor: 'rgb(17, 29, 39)',  // Dark background color
            borderRadius: 5,
            mx: 3,
            display: 'flex',
          }}
        >
          {/* Avatar for the user's profile */}
          <Avatar
            sx={{
              mx: 'auto',
              bgcolor: 'white',
              my: 2,
              color: 'black',
              fontWeight: 700,
            }}
          >
            {auth?.user?.name?.split(' ')[0]?.[0]} {auth?.user?.name?.split(' ')[1]?.[0]}
          </Avatar>

          {/* Text about the chat */}
          <Typography
            sx={{
              mx: 'auto',
              fontFamily: 'Work Sans, sans-serif',
            }}
          >
            You are talking to a ChatBOT
          </Typography>

          <Typography
            sx={{
              mx: 'auto',
              fontFamily: 'Work Sans, sans-serif',
              my: 4,
              p: 3,
            }}
          >
            You can ask questions related to knowledge, business, advice, education, etc. But avoid sharing personal information.
          </Typography>

          {/* Button (e.g., for starting a new conversation) */}
          <Button
            onClick={handleDeleteChats}
            sx={{
              width: '200px',
              my: 'auto',
              color: 'white',
              fontWeight: '700',
              borderRadius: 3,
              mx: 'auto',
              bgcolor: red[300],
              ':hover': {
                bgcolor: red.A400,
              },
            }}
          >
            Clear conversation
          </Button>
        </Box>
      </Box>

      {/* Main chat window */}
      <Box sx={{ display: 'flex', flex: { md: 0.8, xs: 1, sm: 1 }, flexDirection: 'column', px: 3 }}>
        <Typography sx={{ fontSize: '40px', color: 'white', mb: 2, mx: 'auto', fontWeight: '600' }}>
          Model - GPT 3.5 Turbo
        </Typography>

        <Box
          sx={{
            width: '100%',
            height: '60vh',
            borderRadius: 3,
            mx: 'auto',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto',
            scrollBehavior: 'smooth',
            overflowY: 'auto',
          }}
        >
          {/* Render chat messages using the ChatItem component */}
          {chatMessages.map((message, index) => (
            //@ts-ignore
            <ChatItem key={index} role={message.role} content={message.content} />
          ))}
        </Box>
        <div style={{width:'100%',padding:'20px',borderRadius:8,backgroundColor:'rgb(17,27,39)',display:'flex',margin:'auto'}}>
        <input ref={inputRef} type='text' style={{width:'100%', backgroundColor:'transparent',padding:'10px',border:'none',outline:'none',color:'white',fontSize:'20px'}} />
        <IconButton onClick={handleSubmit}  sx={{ml:'auto',color:'whitesmoke'}}>
            <IoMdSend/>
        </IconButton>
        </div>
        
      </Box>
    </Box>
  );
};

export default Chat;
