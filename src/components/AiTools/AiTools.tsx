// ** React Imports
import { useState, useRef, useEffect } from 'react';

// ** MUI Imports
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';

// ** Iconify Imports
import { Icon } from '@iconify/react';

// ** Custom Components Imports
import AiToolsHeader from './AiToolsHeader';
import ChatTab from './ChatTab';

type CustomTabPanelProps = {
  name: string;
  value: string;
  children?: React.ReactNode;
};

function CustomTabPanel({ name, value, children }: CustomTabPanelProps) {
  return (
    <div
      style={{
        height: '100%',
        maxHeight: '100%',
        overflow: 'hidden',
      }}
      role='tabpanel'
      hidden={value !== name}
    >
      <Box height='100%'>
        {children}
      </Box>
    </div>
  );
}

const AiTools = () => {
  // ** State
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [tab, setTab] = useState<string>('chat');

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

  useEffect(() => {
    console.log('New tab:', tab);
  }, [tab]);

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
          <AiToolsHeader currentTab={tab} onTabChange={setTab} onClose={handleClose} />
          <CustomTabPanel value={tab} name='chat'>
            <ChatTab ref={chatBarRef} />
          </CustomTabPanel>
          <CustomTabPanel value={tab} name='alerts'>
            <h1>Alertas</h1>
          </CustomTabPanel>
          <CustomTabPanel value={tab} name='list'>
            <h1>Listado</h1>
          </CustomTabPanel>
        </Box>
      </Popover>
    </>
  );
};

export default AiTools;