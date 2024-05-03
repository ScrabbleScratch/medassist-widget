// ** React Imports
import { forwardRef, useRef, useState } from 'react';

// ** MUI Imports
import { useTheme } from '@mui/material';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

// ** Icon Imports
import { Icon } from '@iconify/react';

type Props = {
  loading?: boolean;
  onSend?: (message: string, attachments: File[]) => void;
};

const ChatBar = forwardRef(({ loading, onSend }: Props, chatBarRef) => {
  // ** Context
  const theme = useTheme();

  // ** Refs
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ** State
  const [message, setMessage] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);

  const handleSend = () => {
    if (!message || message.trim().length === 0) return;
    onSend && onSend(message, files);
    setMessage('');
    setFiles([]);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  // const handleMic = () => {
  //   console.log('Mic');
  // };

  const handleAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selection = Array.from(e.target.files || []);
    const newFiles = [...files];
    selection.forEach((file) => !newFiles.find(f => f.name === file.name) && newFiles.push(file));
    setFiles(newFiles);
    fileInputRef.current!.value = '';
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSend();
  };

  return (
    <form onSubmit={handleSubmit}>
      {(files.length > 0) && (
        <Stack direction='row' spacing={4} padding='10px 10px 0' borderTop={`1px solid ${theme.palette.secondary.main}`} borderRadius='10px 10px 0 0'>
          {Array.from(files).map((file, index) => (
            <Button
              key={index}
              variant='outlined'
              color='secondary'
              size='small'
              onClick={() => handleRemoveFile(index)}
              endIcon={<Icon icon='material-symbols:close' />}
            >
              {file.name}
            </Button>
          ))}
        </Stack>
      )}
      <Stack direction='row' alignItems='flex-end' spacing={4} padding='10px'>
        <TextField
          fullWidth
          multiline
          maxRows={8}
          placeholder='Escribe tu pregunta...'
          value={message}
          disabled={loading}
          inputRef={chatBarRef}
          sx={{
            '&.MuiFormControl-root': {
              margin: 0,
              padding: 0,
            },
          }}
          InputProps={{
            sx: {
              margin: 0,
              padding: 2,
            }
          }}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
        />
        {/* <IconButton onClick={handleMic} disabled={loading}>
          <Icon icon='material-symbols:mic' color={theme.palette.secondary.main} />
        </IconButton> */}
        {/*<IconButton onClick={() => fileInputRef.current?.click()} disabled={loading}>
          <Icon icon='material-symbols:attach-file' color={theme.palette.secondary.main} />
        </IconButton>*/}
        {loading ? (
          <IconButton sx={{ padding: 0 }}>
            <Icon icon='eos-icons:bubble-loading' color='black' fontSize='2em' />
          </IconButton>
        ) : (
          <Button variant='contained' type='submit' disabled={loading}>
            Enviar
          </Button>
        )}
      </Stack>
      <input type='file' multiple ref={fileInputRef} hidden onChange={handleAttach} />
    </form>
  );
});

ChatBar.displayName = 'ChatBar';

export default ChatBar;