# MedAssist chat widget client V2.1
This is a simple chat widget client for the MedAssist chat server. It is built using React.

## Installation
To install the widget you can include the following script at the end of your HTML file:
```html

<script type="text/javascript" charset="UTF-8" src="<YOUR_COMPILED_MODULE_URL>"></script>
<script type="text/javascript">
  MedAssist.mount(
    practitionerUuid='<YOUR_PRACTITIONER_UUID>',
    patientUuid='<YOUR_PATIENT_UUID>',
    caseContextUuid='<YOUR_CASE_CONTEXT_UUID>',
    platformUuid='<YOUR_PLATFORM_UUID>',
    providerUuid='<YOUR_PROVIDER_UUID>',
    apiToken='<YOUR_API_TOKEN>',
  );
</script>

```

# If you need help contact me: Gustavo Ross - Whatsapp: +525526993804
## Exposed functions
- `MedAssist.mount(practitionerUuid: string, patientUuid: string, caseContextUuid: string, platformUuid: string, providerUuid: string, apiToken: string)`: Mounts the chat widget to the DOM.
- `MedAssist.unmount()`: Unmounts the chat widget from the DOM.