// ** MUI Imports
import { useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

// ** Iconify Imports
import { Icon } from '@iconify/react';

// ** Custom Hooks Imports
import { useData } from '../../hooks/useData';

type Props = {
  currentTab?: string;
  onTabChange?: (newTab: string) => void;
  onClose?: () => void;
};

const AiToolsHeader = ({ currentTab, onTabChange, onClose }: Props) => {
  // ** Hooks
  const { initParams, patient } = useData();

  // ** Context
  const theme = useTheme();

  const handleChange = (newValue: string) => {
    onTabChange && onTabChange(newValue);
  };

  const CustomTabButton = ({ name, children }: { name: string, children: string }) => {
    return (
      <Button
        variant={currentTab === name ? 'contained' : 'text' }
        size='small'
        onClick={() => handleChange(name)}
      >
        {children}
      </Button>
    );
  };

  return (
    <Stack
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      spacing={6}
      padding='10px'
      sx={{
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Stack
        width='100%'
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        spacing={6}
      >
        <Stack
          // width='100%'
          direction='row'
          alignItems='center'
          spacing={6}
        >
          <Box>
            <Badge
              overlap='circular'
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant='dot'
              color='success'
            >
              <Avatar alt='Asistente Virtual' src='https://api.aihxp.com/uploads/4_b4b7515f1c.png' sx={{ width: '50px', height: '50px' }} />
            </Badge>
          </Box>
          {patient ? (
            <Stack direction='column' width='100%'>
              <Typography variant='body1' width='100%' fontWeight={700}>Paciente: {patient.name}</Typography>
              <Typography variant='body2' width='100%'>{patient.gender} {patient.birth_date ? `(${new Date(patient.birth_date).toLocaleDateString()})` : ''}</Typography>
              {/* <Typography variant='body1' width='100%' fontWeight={600}>{reason}</Typography> */}
            </Stack>
          ) : (
            <Box>
              <Typography variant='body1' fontWeight={700} color='goldenrod'>
                Sin contexto de paciente
              </Typography>
            </Box>
          )}
        </Stack>
        <ButtonGroup variant='text' aria-label='tabs'>
          <CustomTabButton name='chat'>MedAssist</CustomTabButton>
          {initParams?.caseContextUuid && (
            <CustomTabButton name='sintomatix'>Cuestionario AI</CustomTabButton>
          )}
          <CustomTabButton name='list'>Lista de espera</CustomTabButton>
        </ButtonGroup>
      </Stack>
      {onClose && (
        <Box justifySelf='flex-end' alignSelf='flex-start'>
          <IconButton size='large' onClick={onClose}>
            <Icon icon='material-symbols:close' fontSize='1.2em' />
          </IconButton>
        </Box>
      )}
    </Stack>
  );
};

export default AiToolsHeader;