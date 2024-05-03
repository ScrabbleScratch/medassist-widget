// ** React Imports
import { useState, useRef } from 'react';

// ** MUI Imports
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

  // Sample patient data
  const patients = [
    { name: "Javier Carrasco", age: 30, reason: "Tos severa", waitTime: "15 min", urgency: "Media" },
    { name: "Janeth Rivera L", age: 25, reason: "Cefalea aguda", waitTime: "10 min", urgency: "Alta" },
    { name: "Alicia Jaimes F", age: 40, reason: "Revisión regular", waitTime: "25 min", urgency: "Baja" }
  ];

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
          bottom: '25px',
          right: '90px',
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
        <Box width='60vw' minWidth='800px' height='88vh' display='flex' flexDirection='column'>
          <AiToolsHeader currentTab={tab} onTabChange={setTab} onClose={handleClose} />
          <CustomTabPanel value={tab} name='chat'>
            <ChatTab ref={chatBarRef} />
          </CustomTabPanel>
          <CustomTabPanel value={tab} name='sintomatix'>
            <SintomatixTab />
          </CustomTabPanel>
          <CustomTabPanel value={tab} name='list'>
            <TableContainer component={Paper} sx={{ padding: '30px' }}>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell align="right">Edad</TableCell>
                    <TableCell align="right">Motivo</TableCell>
                    <TableCell align="right">Espera</TableCell>
                    <TableCell align="right">Urgencia</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {patients.map((patient) => (
                    <TableRow
                      key={patient.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">{patient.name}</TableCell>
                      <TableCell align="right">{patient.age}</TableCell>
                      <TableCell align="right">{patient.reason}</TableCell>
                      <TableCell align="right">{patient.waitTime}</TableCell>
                      <TableCell align="right">{patient.urgency}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CustomTabPanel>
        </Box>
      </Popover>
    </>
  );
};

export default AiTools;
