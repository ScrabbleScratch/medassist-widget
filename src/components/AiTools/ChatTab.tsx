// ** React Imports
import { forwardRef, useState, useEffect } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

// ** Custom hooks imports
import { useAuth } from '../../hooks/useAuth';
import { useData } from '../../hooks/useData';

// ** Custom Components Imports
import ChatMessages from './Chat/ChatMessages';
import ChatBar from './Chat/ChatBar';

// ** Types
import { Message } from './Chat/ChatBubble';

const ChatTab = forwardRef((_, chatBarRef) => {
  // ** Hooks
  const { token } = useAuth();
  const { conversation, getCompletion } = useData();

  // ** State
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  // const requestAiConsultation = async (message: string, attachments: File[]) => {
  const requestAiConsultation = async (message: string) => {
    if (!token) {
      console.error('Can not connect to chat because token is empty!');

      return;
    }

    await getCompletion(message);
  };

  const handleSend = (message: string, attachments: File[]) => {
    const newMessages = [...messages, { message, attachments, isUser: true, sentAt: new Date().toLocaleTimeString() , read: false }];

    setMessages(newMessages);
    setLoading(true);
    // requestAiConsultation(message, attachments)
    requestAiConsultation(message)
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (!conversation) return;
      const newMessages: Message[] = conversation?.map(msg => ({
        message: msg.data.content,
        isUser: msg.type === 'human',
        sentAt: new Date(msg.data.timestamp).toLocaleTimeString(),
        read: true,
      })) ?? [];
      setMessages(newMessages);
    })().finally(() => setLoading(false));
  }, [conversation]);

  return (
    <Box height='100%' maxHeight='100%' overflow='hidden'>
      <Stack height='100%' maxHeight='100%' justifyContent='space-between'>
        <ChatMessages messages={messages} />
        <ChatBar loading={loading} onSend={handleSend} ref={chatBarRef} />
      </Stack>
    </Box>
  );
});

ChatTab.displayName = 'ChatTab';

export default ChatTab;