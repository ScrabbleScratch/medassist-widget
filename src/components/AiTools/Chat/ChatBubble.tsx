// ** MUI Imports
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

// ** Icon Imports
import { Icon } from '@iconify/react';

export type Message = {
  message: string;
  attachments?: File[];
  isUser: boolean;
  sentAt: string;
  read: boolean;
};

type Props = {
  message: Message;
};

const ChatBubble = ({ message }: Props) => {
  const theme = useTheme();

  return (
    <Stack direction={message.isUser ? 'row-reverse' : 'row'} spacing={4} sx={{ width: '100%' }}>
      <Box>
        <Badge
          overlap='circular'
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant='dot'
          color='success'
        >
          <Avatar alt='Asistente Virtual' src={message.isUser ? 'https://api.aihxp.com/uploads/1_68115bbe0b.png' : 'https://api.aihxp.com/uploads/4_b4b7515f1c.png'} />
        </Badge>
      </Box>
      <Stack direction='column' alignItems={message.isUser ? 'flex-end' : 'flex-start'} spacing={1}>
        {(message.attachments && message.attachments.length > 0) && (
          <Typography variant='body2' color='textSecondary'>
            {message.attachments?.length} archivos adjuntos
          </Typography>
        )}
        <Box
          sx={{
            width: 'fit-content',
            padding: '10px',
            wordBreak: 'break-word',
            borderRadius: `${message.isUser ? '10px 0' : '0 10px'} 10px 10px`,
            backgroundColor: message.isUser ? theme.palette.primary.main : '#FFF',
            color: message.isUser ? theme.palette.primary.contrastText : '#000',
            boxShadow: '0 3px 3px rgba(0, 0, 0, 0.25)',
          }}
        >
          {message.isUser ? message.message : (
            <div dangerouslySetInnerHTML={{ __html: message.message }} />
          )}
        </Box>
        <Stack direction='row' justifyContent={message.isUser ? 'flex-end' : 'flex-start'} alignItems='center' spacing={1}>
          {message.isUser && <Icon icon='material-symbols:done-all' color={message.read ? theme.palette.success.main : theme.palette.secondary.main} />}
          <Typography variant='body2' color='textSecondary'>
            {message.sentAt}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ChatBubble;