// ** React Imports
import { useRef, useEffect } from 'react';

// ** MUI Imports
import Stack from '@mui/material/Stack';

// ** Custom Components Imports
import ChatBubble, { Message } from './ChatBubble';

type Props = {
  messages: Message[];
};

const ChatMessages = ({ messages }: Props) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Stack
      width='100%'
      height='100%'
      padding='25px 25px 0'
      spacing={4}
      sx={{
        overflowY: 'scroll',

        // Hide scrollbar
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      {messages.map((message, index) => (
        <ChatBubble key={index} message={message} />
      ))}
      <div ref={messagesEndRef} />
    </Stack>
  );
};

export default ChatMessages;