// ** React Imports
import { useRef, useEffect } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';

// ** Custom Components Imports
import AiToolsHeader from './AiToolsHeader';
import ChatTab from './ChatTab';

const AiToolsWidget = () => {
  // ** Refs
  const chatBarRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  // ** Create a new keydown event listener in html body on mount to focus chat bar
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      console.log('Key down:', e);
      chatBarRef.current?.focus();
    };

    document.body.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <Box
      height='100vh'
      maxHeight='100vh'
      display='flex'
      flexDirection='column'
      justifyContent='space-between'
      sx={{
        backgroundColor: '#FFF',
      }}
    >
      <AiToolsHeader/>
      <ChatTab ref={chatBarRef} />
    </Box>
  );
};

export default AiToolsWidget;