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

// const caseTranslate = {
//   adult: 'Adulto',
//   obstetric: 'Obstétrico',
//   pediatric: 'Pediátrico',
// };

type Props = {
  onClose?: () => void;
};

const AiToolsHeader = ({ onClose }: Props) => {
  // ** Context
  const theme = useTheme();

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
          <Avatar alt='Asistente Virtual' src='/avatars/4.png' sx={{ width: '60px', height: '60px' }} />
        </Badge>
      </Box>
      <Stack direction='column' width='100%'>
        <Typography variant='body1' width='100%' fontSize='1.4em' fontWeight={700}>Paciente: John Doe</Typography>
        <Typography variant='body2' width='100%' fontSize='1em'>Hombre  30 años (01/01/1995) (Adulto)</Typography>
        <Typography variant='body1' width='100%' fontSize='1.2em' fontWeight={600}>Prueba de implementacion de chat widget</Typography>
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