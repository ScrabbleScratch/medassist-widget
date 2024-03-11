# MedAssist chat widget client
This is a simple chat widget client for the MedAssist chat server. It is built using React.

## Installation
To install the widget you can include the following script at the end of your HTML file:
```html
<script type="text/javascript" charset="UTF-8" src="<MODULE_URL>"></script>
<script type="text/javascript">
  MedAssist.mount(
    '<YOUR_API_TOKEN>',
    '<YOUR_AI_CONSULTATION_UUID>'
  );
</script>
```

## Exposed functions
- `MedAssist.mount(apiToken: string, aiConsultationUuid: string)`: Mounts the chat widget to the DOM.
- `MedAssist.unmount()`: Unmounts the chat widget from the DOM.