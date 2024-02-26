// ** React Imports
import { forwardRef, useState, useEffect } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

// ** Context Imports
// import { useAuth } from 'src/hooks/useAuth';
// import { useStrapi } from 'src/hooks/useStrapi';

// ** Custom Components Imports
import ChatMessages from './Chat/ChatMessages';
import ChatBar from './Chat/ChatBar';

// ** Types
import { Message } from './Chat/ChatBubble';

// ** Utils Imports
// import { getConsultationByUuid, getAiConsultationByUuid, createOrUpdateAiConsultationByUuid, createAgentCompletion } from '@/utils/strapi';

// ** Types Imports
// import { Data, AiConsultationFields, QuestionsAnswersFields } from '@/utils/strapi/types';

const ChatTab = forwardRef((_, chatBarRef) => {
  // ** Context
  // const { user } = useAuth();
  // const { strapi } = useStrapi();

  // ** State
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  // ** Functions
  // const findAiConsultationByUser = (aiConsultations: Data<AiConsultationFields>[]) => {
  //   if (!user) return null;

  //   return aiConsultations.find(aiConsultation => aiConsultation.attributes.user.data?.id === user.id) ?? null;
  // };

  // const requestAiConsultation = async (message: string, attachments: File[], messageHistory: Message[], updateHistory = true) => {
  //   if (!strapi.consultation) {
  //     console.error('Can not connect to chat because consultation is null!');
      
  //     return;
  //   }

  //   const consultation = await getConsultationByUuid(strapi.consultation.attributes.uuid, user?.token ?? '');

  //   if (!consultation) {
  //     console.error('Can not connect to chat because could not retrieve consultation data!');

  //     return;
  //   }

  //   let aiConsultation: Data<AiConsultationFields>|null = findAiConsultationByUser(consultation.attributes.ai_consultations.data);

  //   if (!aiConsultation)
  //     aiConsultation = await createOrUpdateAiConsultationByUuid('', {
  //       consultation: consultation.id,
  //       user_type: 'médico',
  //       user: user?.id,
  //       physician: user?.physician?.id ?? undefined,
  //     }, user?.token ?? '');

  //   if (!aiConsultation) {
  //     console.error('Can not connect to chat because could not retrieve ai-consultation data!');

  //     return;
  //   }

  //   const payload = {
  //     input: message,
  //     ai_consultation_uuid: aiConsultation.attributes.uuid,
  //   };

  //   const completion = await createAgentCompletion(payload, attachments, user?.token ?? '');

  //   if (!completion) {
  //     console.error('Could not retrieve agent completion data!');

  //     return;
  //   }

  //   console.log('Completion:', completion);

  //   if (!updateHistory) return;

  //   const newMessages = [...messageHistory];
  //   newMessages.push({
  //     message: completion.data.message,
  //     isUser: false,
  //     sentAt: new Date().toLocaleTimeString(),
  //     read: true,
  //   });

  //   setMessages(newMessages);
  // };

  const handleSend = (message: string, attachments: File[]) => {
    console.log(message, attachments);

    const newMessages = [...messages, { message, attachments, isUser: true, sentAt: new Date().toLocaleTimeString() , read: false }];

    setMessages(newMessages);
    // setLoading(true);
    // requestAiConsultation(message, attachments, newMessages)
    //   .catch(err => console.error(err))
    //   .finally(() => setLoading(false));
    setLoading(false); // REMOVE LATER
  };

  useEffect(() => {
    // (async () => {
    //   setLoading(true);
    //   await requestAiConsultation('init', [], [], false);
    //   if (!strapi.consultation) return;
    //   const consultation = await getConsultationByUuid(strapi.consultation.attributes.uuid, user?.token ?? '');
    //   const userAiConsultation = findAiConsultationByUser(consultation?.attributes.ai_consultations.data ?? []);
    //   if (!userAiConsultation) return;
    //   const aiConsultation = await getAiConsultationByUuid(userAiConsultation.attributes.uuid, user?.token ?? '');
    //   if (!aiConsultation) return;
    //   const newMessages: Message[] = aiConsultation.attributes.questions_answers?.map((qa: QuestionsAnswersFields) => ({
    //     message: qa.data.content,
    //     isUser: qa.type === 'human',
    //     sentAt: new Date(qa.data.timestamp).toLocaleTimeString(),
    //     read: true,
    //   })) ?? [];
    //   if (newMessages.length === 0 && aiConsultation.attributes.medical_summary)
    //     newMessages.push({
    //       message: aiConsultation.attributes.medical_summary,
    //       isUser: false,
    //       sentAt: '',
    //       read: true,
    //     });
    //   setMessages(newMessages);
    // })().finally(() => setLoading(false));
  }, []);

  return (
    <Box height='100%' maxHeight='100%' overflow='hidden'>
      <Stack height='100%' maxHeight='100%' justifyContent='space-between'>
        <ChatMessages messages={messages} />
        <ChatBar loading={loading} onSend={handleSend} ref={chatBarRef} />
      </Stack>
    </Box>
  );
});

ChatTab.displayName = 'ChatTab';

export default ChatTab;