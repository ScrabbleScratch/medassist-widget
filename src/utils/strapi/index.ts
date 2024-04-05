import axios from 'axios';

const strapi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// AI-ASSISTANCE

export const getAiAssistance = async (practitionerUuid: string, caseContextUuid: string, platformUuid: string, providerUuid: string, token: string) => {
  const response = await strapi.get('/ai-assistance', {
    params: {
      practitionerUuid,
      caseContextUuid,
      platformUuid,
      providerUuid
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
    
  return response.data;
};

// Function to send a new message
export const postAiAssistance = async (input: string, practitionerUuid: string, caseContextUuid: string, platformUuid: string, providerUuid: string, attachments: unknown, token: string) => {
  const response = await strapi.post('/ai-assistance', {
    input,
    practitionerUuid,
    caseContextUuid,
    platformUuid,
    providerUuid,
    attachments
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  
  return response.data;
};

// SYSTEM MESSAGES

export async function sendSintomatixEmail(email: string, sintomatix: string, token: string): Promise<boolean> {
  try {
    const response = await strapi.post('/system_message_email', {
      email,
      type: 'sintomatix',
      args: sintomatix,
      channel: 'email',
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.status === 200;
  } catch (error) {
    console.log(error);

    return false;
  }
}

export async function sendSintomatixSms(phone: string, sintomatix: string, token: string): Promise<boolean> {
  try {
    const response = await strapi.post('/system_message_email', {
      phone,
      type: 'sintomatix',
      args: sintomatix,
      channel: 'sms',
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.status === 200;
  } catch (error) {
    console.log(error);

    return false;
  }
}