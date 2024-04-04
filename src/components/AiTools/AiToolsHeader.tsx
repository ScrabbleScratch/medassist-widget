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
  const { consultation, patient } = useData();

  // ** Context
  const theme = useTheme();

  const name = [
    patient?.attributes.first_name?.trim(),
    patient?.attributes.middle_name?.trim(),
    patient?.attributes.last_name?.trim(),
    patient?.attributes.mother_last_name?.trim(),
  ].filter(Boolean).join(' ');
  const sex = patient?.attributes.sex?.trim();
  const age = patient?.attributes.age;
  const dob = patient?.attributes.birth_date?.trim();
  const type = consultation?.attributes.patient_type?.trim();
  const reason = consultation?.attributes.reason?.trim();

  const handleChange = (newValue: string) => {
    onTabChange && onTabChange(newValue);
  };

  const CustomTabButton = ({ name, children }: { name: string, children: string }) => {
    return (
      <Button
        variant={currentTab === name ? 'contained' : 'text' }
        onClick={() => handleChange(name)}
      >
        {children}
      </Button>
    );
  };

  return (
    <Stack
      direction='row'
      alignItems='center'
      spacing={6}
      padding='10px'
      sx={{
        backgroundColor: theme.palette.background.default,
      }}
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
      <Stack direction='column' width='100%'>
        {name && (
          <Typography variant='body1' width='100%' fontWeight={700}>Paciente: {name}</Typography>
        )}
        <Typography variant='body2' width='100%'>{sex ? (sex === 'male' ? 'Hombre' : 'Mujer') : ''}  {age ? `${age} años` : ''} {dob ? `(${new Date(dob).toLocaleDateString()})` : ''} {type ? `(${type})` : ''}</Typography>
        <Typography variant='body1' width='100%' fontWeight={600}>{reason}</Typography>
      </Stack>
      <ButtonGroup variant='text' aria-label='tabs'>
        <CustomTabButton name='chat'>MedAssist</CustomTabButton>
        <CustomTabButton name='sintomatix'>Cuestionario AI</CustomTabButton>
        <CustomTabButton name='list'>Lista de espera</CustomTabButton>
      </ButtonGroup>
      {onClose && (
        <Box alignSelf='flex-start'>
          <IconButton size='large' onClick={onClose}>
            <Icon icon='material-symbols:close' fontSize='1.2em' />
          </IconButton>
        </Box>
      )}
    </Stack>
  );
};

export default AiToolsHeader;