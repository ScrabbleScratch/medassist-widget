// ** React Imports
import { SyntheticEvent } from 'react';

// ** MUI Imports
import Divider from '@mui/material/Divider';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// ** Icon Imports
import { Icon } from '@iconify/react';

type Props = {
  title: string;
  icon?: string;
  count?: number;
  children: React.ReactNode;
  expanded: boolean;
  onChange: (event: SyntheticEvent, isExpanded: boolean) => void;
};

const Collapsible = ({ title, icon, count, children, expanded, onChange }: Props) => {
  return (
    <Accordion expanded={expanded} onChange={onChange}>
      <AccordionSummary
        expandIcon={<Icon icon='mdi:chevron-down' />}
      >
        <Stack direction='row' alignItems='center' justifyContent='space-between' width='95%'>
          <Stack direction='row' alignItems='center' spacing={2}>
            {icon && <Icon icon={icon} />}
            <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
              {title}
            </Typography>
          </Stack>
          {count && (
            <Typography variant='subtitle2' sx={{ fontWeight: 600 }}>
              {count}
            </Typography>
          )}
        </Stack>
      </AccordionSummary>
      <Divider sx={{ m: '0 !important' }} />
      <AccordionDetails>
        {children}
      </AccordionDetails>
    </Accordion>
  );
};

export default Collapsible;