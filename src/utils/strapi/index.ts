import axios from 'axios';

// ** Types imports
import type { Data, FieldsUpdate, PatientFields, CaseFields, ObservationFields, ConsultationFields, AiConsultationFields } from './types';

const strapi = axios.create({
  baseURL: 'https://api.aihxp.com/api',
});

// PATIENTS

export async function getPatientByUuid(uuid: string, token: string): Promise<Data<PatientFields> | null> {
  try {
    const response = await strapi.get('/patients', {
      params: {
        'populate': '*',
        'filters[uuid]': uuid,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data[0];
  } catch (error) {
    console.log(error);

    return null;
  }
}

// CASES

export async function getCaseByUuid(uuid: string, token: string): Promise<Data<CaseFields> | null> {
  try {
    const response = await strapi.get('/cases', {
      params: {
        'populate': 'patient, location, diagnoses, primary_care_physician, primary_care_physician.user, primary_care_physician.user.role, nurse, nurse.user, nurse.user.role, observations, ai_reports, consultations, consultations.physician, consultations.physician.user, consultations.medical_notes, consultations.ai_consultations, resource, localizations',
        'filters[uuid]': uuid,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data[0];
  } catch (error) {
    console.log(error);

    return null;
  }
}

export async function getCaseByConsultationUuid(uuid: string, token: string): Promise<Data<CaseFields> | null> {
  try {
    const response = await strapi.get('/cases', {
      params: {
        'populate': 'patient, location, diagnoses, primary_care_physician, primary_care_physician.user, primary_care_physician.user.role, nurse, nurse.user, nurse.user.role, observations, consultations, consultations.medical_notes, consultations.ai_consultations, resource, localizations',
        'filters[consultations][uuid]': uuid,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data[0];
  } catch (error) {
    console.log(error);

    return null;
  }
}

// CONSULTATIONS

export async function createEmptyConsultation(token: string): Promise<ObservationFields | null> {
  try {
    const response = await strapi.post('/observations', {}, {
      params: {
        'populate': '*',
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data.attributes;
  } catch (error) {
    console.log(error);

    return null;
  }
}

export async function getConsultationByUuid(uuid: string, token: string): Promise<Data<ConsultationFields> | null> {
  try {
    const response = await strapi.get('/consultations', {
      params: {
        'populate': 'physician, medical_notes, ai_consultations, ai_consultations.user, ai_consultations.physician',
        'filters[uuid]': uuid,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data[0];
  } catch (error) {
    console.log(error);

    return null;
  }
}

export async function updateConsultationByUuid(uuid: string, data: FieldsUpdate<ConsultationFields>, token: string): Promise<Data<ConsultationFields> | null> {
  try {
    const consultation = await getConsultationByUuid(uuid, token); // get consultation by uuid

    if (!consultation) return null;

    const response = await strapi.put(`/consultations/${consultation.id}`, { data }, { // update consultation
      params: {
        'populate': '*',
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error) {
    console.log(error);

    return null;
  }
}

export async function createOrUpdateConsultationByUuid(uuid: string, data: FieldsUpdate<ConsultationFields>, token: string): Promise<Data<ConsultationFields> | null> {
  try {
    const consultation = await getConsultationByUuid(uuid, token); // get consultation by uuid

    if (!consultation) {
      const response = await strapi.post('/consultations', { data }, { // create consultation
        params: {
          'populate': '*',
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data;
    }

    const response = await strapi.put(`/consultations/${consultation.id}`, { data }, { // update consultation
      params: {
        'populate': '*',
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data
  } catch (error) {
    console.log(error);

    return null;
  }
}

// AI CONSULTATIONS

export async function createEmptyAiConsultation(token: string): Promise<AiConsultationFields | null> {
  try {
    const response = await strapi.post('/ai-consultations', {}, {
      params: {
        'populate': '*',
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data.attributes;
  } catch (error) {
    console.log(error);

    return null;
  }
}

export async function getAiConsultationByUuid(uuid: string, token: string): Promise<Data<AiConsultationFields> | null> {
  try {
    const response = await strapi.get('/ai-consultations', {
      params: {
        'populate': 'consultation,consultation.case,consultation.case,consultation.case.patient',
        'filters[uuid]': uuid,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data[0];
  } catch (error) {
    console.log(error);

    return null;
  }
}

export async function updateAiConsultationByUuid(uuid: string, data: FieldsUpdate<AiConsultationFields>, token: string): Promise<Data<AiConsultationFields> | null> {
  try {
    const aiConsultation = await getAiConsultationByUuid(uuid, token); // get ai consultation by uuid

    if (!aiConsultation) return null;

    const response = await strapi.put(`/ai-consultations/${aiConsultation.id}`, { data }, { // update consultation
      params: {
        'populate': '*',
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error) {
    console.log(error);

    return null;
  }
}

export async function createOrUpdateAiConsultationByUuid(uuid: string, data: FieldsUpdate<AiConsultationFields>, token: string): Promise<Data<AiConsultationFields> | null> {
  try {
    const aiConsultation = await getAiConsultationByUuid(uuid, token); // get ai consultation by uuid

    if (!aiConsultation) {
      const response = await strapi.post('/ai-consultations', { data }, { // create consultation
        params: {
          'populate': '*',
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data;
    }

    const response = await strapi.put(`/ai-consultations/${aiConsultation.id}`, { data }, { // update ai consultation
      params: {
        'populate': '*',
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data
  } catch (error) {
    console.log(error);

    return null;
  }
}

// AI AGENT

export type AiAgentPayloadType = {
  input: string;
  ai_consultation_uuid: string;
};

export type AiAgentResponseType = {
  success: boolean;
  data: {
    message: string;
  };
};

export async function createAgentCompletion(data: AiAgentPayloadType, attachments: File[], token: string): Promise<AiAgentResponseType | null> {
  try {
    const formData = new FormData();
    formData.append('input', data.input);
    formData.append('ai_consultation_uuid', data.ai_consultation_uuid);
    if (attachments.length > 0) {
      attachments.forEach((attachment) => {
        formData.append('files[]', attachment);
      });
    }
    const response = await strapi.post('/agent', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);

    return null;
  }
}

export async function initializeAgentCompletion(consultationUuid: string, userId: string | number, physicianId: string | number, token: string): Promise<AiAgentResponseType | null> {
  try {
    const consultation = await getConsultationByUuid(consultationUuid, token); // get consultation by uuid

    if (!consultation) {
      console.error('Can not connect to chat because could not retrieve consultation data!');

      return null;
    }

    const aiConsultations = consultation.attributes.ai_consultations.data;

    let userAiConsultation = aiConsultations?.find(aiConsultation => aiConsultation.attributes.user.data?.id === userId) ?? null

    if (!userAiConsultation)
      userAiConsultation = await createOrUpdateAiConsultationByUuid('', {
        consultation: consultation.id,
        user_type: 'médico',
        user: userId,
        physician: physicianId,
      }, token);

    if (!userAiConsultation) {
      console.error('Can not connect to chat because could not retrieve ai-consultation data!');

      return null;
    }

    const response = await createAgentCompletion({
      input: 'init',
      ai_consultation_uuid: userAiConsultation.attributes.uuid,
    }, [], token);

    return response;
  } catch (error) {
    console.log(error);

    return null;
  }
}