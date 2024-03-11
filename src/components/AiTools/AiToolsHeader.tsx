// ** MUI Imports
import { useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

// ** Iconify Imports
import { Icon } from '@iconify/react';

// ** Custom Hooks Imports
import { useData } from '../../hooks/useData';

type Props = {
  onClose?: () => void;
};

const AiToolsHeader = ({ onClose }: Props) => {
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
          <Avatar alt='Asistente Virtual' src='https://api.aihxp.com/uploads/4_b4b7515f1c.png' sx={{ width: '60px', height: '60px' }} />
        </Badge>
      </Box>
      <Stack direction='column' width='100%'>
        {name && (
          <Typography variant='body1' width='100%' fontSize='1.4em' fontWeight={700}>Paciente: {name}</Typography>
        )}
        <Typography variant='body2' width='100%' fontSize='1em'>{sex ? (sex === 'male' ? 'Hombre' : 'Mujer') : ''}  {age ? `${age} años` : ''} {dob ? `(${new Date(dob).toLocaleDateString()})` : ''} {type ? `(${type})` : ''}</Typography>
        <Typography variant='body1' width='100%' fontSize='1.2em' fontWeight={600}>{reason}</Typography>
      </Stack>
      {onClose && (
        <Box sx={{ alignSelf: 'flex-start' }}>
          <IconButton size='large' onClick={onClose}>
            <Icon icon='material-symbols:close' fontSize='1.2em' />
          </IconButton>
        </Box>
      )}
    </Stack>
  );
};

export default AiToolsHeader;