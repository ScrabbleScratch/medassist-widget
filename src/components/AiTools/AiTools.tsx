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
import SintomatixTab from './SintomatixTab';

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
      <Box height='100%' sx={{ overflowX: 'hidden', overflowY: 'auto' }}>
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

  return (
    <>
      <Button
        variant='contained'
        color='primary'
        size='medium'
        endIcon={<Icon icon='ic:baseline-auto-awesome' />}
        sx={{
          position: 'fixed',
          bottom: '40px',
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
          vertical: 'bottom',
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
        <Box width='90vw' height='88vh' display='flex' flexDirection='column'>
          <AiToolsHeader currentTab={tab} onTabChange={setTab} onClose={handleClose} />
          <CustomTabPanel value={tab} name='chat'>
            <ChatTab ref={chatBarRef} />
          </CustomTabPanel>
          <CustomTabPanel value={tab} name='sintomatix'>
            <SintomatixTab />
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