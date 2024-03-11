// ** React Imports
import { useState, useRef } from 'react';

// ** MUI Imports
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';

// ** Iconify Imports
import { Icon } from '@iconify/react';

// ** Custom Components Imports
import AiToolsHeader from './AiToolsHeader';
import ChatTab from './ChatTab';

const AiTools = () => {
  // ** State
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  // ** Refs
  const chatBarRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  // ** Functions

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Button
        variant='contained'
        color='primary'
        size='medium'
        endIcon={<Icon icon='ic:baseline-auto-awesome' />}
        sx={{
          position: 'fixed',
          bottom: '50px',
          right: '25px',
        }}
        onClick={handleOpen}
      >
        Asistente IA
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        sx={{
          backgroundColor: '#0005',
        }}
        onKeyDown={() => {
          chatBarRef.current?.focus();
        }}
      >
        <Box width='90vw' height='80vh' display='flex' flexDirection='column'>
          <AiToolsHeader onClose={handleClose} />
          <ChatTab ref={chatBarRef} />
        </Box>
      </Popover>
    </>
  );
};

export default AiTools;