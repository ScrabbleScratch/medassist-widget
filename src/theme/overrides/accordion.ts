// ** Type Import
import { OwnerStateThemeType } from './'

const Accordion = () => {
  return {
    MuiAccordion: {
      styleOverrides: {
        root: ({ ownerState, theme }: OwnerStateThemeType) => ({
          boxShadow: theme.shadows[1],
          ...(ownerState.disabled === true && {
            backgroundColor: `rgba(${theme.palette.customColors.main}, 0.12)`
          }),
          ...(ownerState.expanded === true && {
            boxShadow: theme.shadows[3],
            '&:not(:first-of-type)': { borderTop: `1px solid ${theme.palette.divider}` },
          })
        })
      }
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: ({ ownerState, theme }: OwnerStateThemeType) => ({
          borderRadius: 'inherit',
          padding: `0 ${theme.spacing(5)}`,
          ...(ownerState.expanded === true && {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0
          }),
          '& + .MuiCollapse-root': {
            '& .MuiAccordionDetails-root:first-child': {
              paddingTop: 0
            }
          }
        }),
        content: ({ theme }: OwnerStateThemeType) => ({
          margin: `${theme.spacing(2.5)} 0`
        }),
        expandIconWrapper: ({ theme }: OwnerStateThemeType) => ({
          color: theme.palette.text.secondary
        })
      }
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          padding: theme.spacing(5),
          '& + .MuiAccordionDetails-root': {
            paddingTop: 0
          }
        })
      }
    }
  }
}

export default Accordion
