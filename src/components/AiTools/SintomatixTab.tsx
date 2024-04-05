// React Import
import { useState, useRef } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

// QR Code Imports
import QRCode from 'react-qr-code';

// ** Iconify Imports
import { Icon } from '@iconify/react';

// Hooks Imports
import { useAuth } from '../../hooks/useAuth';
import { useData } from '../../hooks/useData';

// Utils Imports
import { sendSintomatixEmail, sendSintomatixSms } from '../../utils/strapi';

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phonePattern = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

const SintomatixTab = () => {
  const { token } = useAuth();
  const { initParams, provider } = useData();

  const inputRef = useRef<HTMLInputElement>(null);

  const sintomatixBaseUrl = import.meta.env.VITE_SINTOMATIX_BASE_URL as string;
  const sintomatix = `${sintomatixBaseUrl.replace('app', provider?.host || 'app')}/widget_transferred?case_context_uuid=${initParams.caseContextUuid}&who_is=patient`;

  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState<boolean>();
  const [fillingSintomatix, setFillingSintomatix] = useState(false);

  const clearInput = () => {
    if (inputRef.current)
      inputRef.current.value = '';
  };

  const evaluateSuccess = (rs: boolean) => {
    setSuccess(rs);
    if (rs) clearInput();
    console.log('Questionaire sent:', rs);
  }

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const recipient = formData.get('recipient')?.toString().trim();
    console.log('Recipient:', recipient);

    if (!token || !recipient) return;

    setSuccess(undefined);
    setSending(true);
    if (emailPattern.test(recipient)) {
      sendSintomatixEmail(recipient, sintomatix, token)
        .then(evaluateSuccess)
        .finally(() => setSending(false));
    } else if (phonePattern.test(recipient)) {
      sendSintomatixSms(recipient, sintomatix, token)
        .then(evaluateSuccess)
        .finally(() => setSending(false));
    } else {
      setSuccess(false);
      setSending(false);
      console.log('Unknown');
    }
  };

  if (fillingSintomatix)
    return (
      <Box p='10px' height='100%' overflow='hidden'>
        <Stack height='100%' gap={2}>
          <Box>
            <Button variant='outlined' size='small' startIcon={<Icon icon='carbon:return' />} onClick={() => setFillingSintomatix(false)}>
              Regresar
            </Button>
          </Box>
          <iframe src={sintomatix} title='Sintomatix' width='100%' height='100%' />
        </Stack>
      </Box>
    );
  
  return (
    <Box p='25px'>
      <Stack direction='row' gap={4}>
        <Box width='50%'>
          <Typography mb={4}>
            1. Muestra este código al paciente.<br />
            2. Pide que lo escanée con su celular.<br />
            3. Indícale que siga instrucciones en pantalla.
          </Typography>
          <Box textAlign='center'>
            <QRCode
              size={180}
              value={sintomatix}
            />
          </Box>
        </Box>
        <Box width='50%'>
          <Typography mb={2}>
            Enviar al celular o correo del paciente:
          </Typography>
          <form onSubmit={handleSend}>
            <FormControl size='small' fullWidth sx={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
              <OutlinedInput id='recipient-input' name='recipient' fullWidth inputRef={inputRef} />
              <Button type='submit' variant='contained' disabled={sending}>Enviar</Button>
            </FormControl>
          </form>
          {success === true && (
            <Alert severity='success'>Cuestionario enviado</Alert>
          )}
          {success === false && (
            <Alert severity='error'>Cuestionario no pudo ser enviado</Alert>
          )}
          <Typography mt={6} mb={2}>
            O comparte este link con el paciente:
          </Typography>
          <a href={sintomatix} target='_blank'>
            {sintomatix}
          </a>
        </Box>
      </Stack>
      <Box mt='35px' p='15px' border='1px solid black' borderRadius='10px'>
        <Stack direction='row' justifyContent='space-between' alignItems='center' gap={4}>
          <Typography>
            Abre el cuestionario y rellenalo para tu paciente
          </Typography>
          <Button variant='outlined' size='small' onClick={() => setFillingSintomatix(true)}>
            Llenar Cuestionario
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default SintomatixTab;