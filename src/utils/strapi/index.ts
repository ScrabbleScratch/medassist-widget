import axios from 'axios';
import { Data, FieldsUpdate, PatientFields, ResourceFields, CaseFields, ObservationFields, ConsultationFields, AiReportFields, AiConsultationFields, MedicalNoteFields, PhysicianFields, NurseFields } from './types';

const strapi = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL,
});

export async function getAllCases(token: string): Promise<Data<CaseFields>[] | null> {
  try {
    const response = await strapi.get('/cases', {
      params: {
        'populate': 'patient, location, diagnoses, primary_care_physician, primary_care_physician.user, consultations, consultations.ai_consultations, consultations.medical_notes, localizations',
        'sort': 'createdAt:desc',
        'pagination[limit]': 100,
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

export async function getAllCasesFromLocation(locationUuid: string, token: string): Promise<Data<CaseFields>[] | null> {
  try {
    const response = await strapi.get('/cases', {
      params: {
        'filters[location][uuid]': locationUuid,
        'populate': 'patient, location, diagnoses, primary_care_physician, primary_care_physician.user, nurse, nurse.user, consultations, consultations.ai_consultations, consultations.medical_notes, resource, localizations',
        'sort': 'createdAt:desc',
        'pagination[limit]': 100,
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

export async function getAllOpenCasesFromLocation(locationUuid: string, token: string): Promise<Data<CaseFields>[] | null> {
  try {
    const response = await strapi.get('/cases', {
      params: {
        'filters[location][uuid]': locationUuid,
        'filters[status][$ne]': 'Alta',
        'populate': 'patient, location, diagnoses, primary_care_physician, primary_care_physician.user, nurse, nurse.user, consultations, consultations.ai_consultations, consultations.medical_notes, resource, localizations',
        'sort': 'createdAt:desc',
        'pagination[limit]': 100,
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

export async function getAllDischargedCasesFromLocation(locationUuid: string, token: string): Promise<Data<CaseFields>[] | null> {
  try {
    const response = await strapi.get('/cases', {
      params: {
        'filters[location][uuid]': locationUuid,
        'filters[status]': 'Alta',
        'populate': 'patient, location, diagnoses, primary_care_physician, primary_care_physician.user, nurse, nurse.user, consultations, consultations.ai_consultations, consultations.medical_notes, resource, localizations',
        'sort': 'createdAt:desc',
        'pagination[limit]': 100,
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

export async function getAllResourcesFromLocation(locationUuid: string, token: string): Promise<Data<ResourceFields>[] | null> {
  try {
    const response = await strapi.get('/resources', {
      params: {
        'filters[location][uuid]': locationUuid,
        'populate': '*',
        'pagination[limit]': 100,
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

export async function getAllPhysiciansFromLocation(locationUuid: string, token: string): Promise<Data<PhysicianFields>[] | null> {
  try {
    const response = await strapi.get('/physicians', {
      params: {
        'filters[user][location][uuid]': locationUuid,
        'populate': '*',
        'pagination[limit]': 100,
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

export async function getAllNursesFromLocation(locationUuid: string, token: string): Promise<Data<NurseFields>[] | null> {
  try {
    const response = await strapi.get('/nurses', {
      params: {
        'filters[user][location][uuid]': locationUuid,
        'populate': '*',
        'pagination[limit]': 100,
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

// PATIENTS

export async function createEmptyPatient(token: string): Promise<PatientFields | null> {
  try {
    const response = await strapi.post('/patients', {}, {
      params: {
        'populate': '*',
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);

    return null;
  }
}

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

export async function updatePatientByUuid(uuid: string, data: FieldsUpdate<PatientFields>, token: string): Promise<Data<PatientFields> | null> {
  try {
    const patient = await getPatientByUuid(uuid, token); // get patient by uuid

    if (!patient) return null;

    const response = await strapi.put(`/patients/${patient.id}`, { data }, { // update patient
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

export async function createOrUpdatePatientByUuid(uuid: string, data: FieldsUpdate<PatientFields>, token: string): Promise<Data<PatientFields> | null> {
  try {
    const patient = await getPatientByUuid(uuid, token); // get patient by uuid

    if (!patient) {
      const response = await strapi.post('/patients', data, { // create patient
        params: {
          'populate': '*',
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return {
        id: response.data.id,
        attributes: {
          ...response.data,
        },
      };
    }

    const response = await strapi.put(`/patients/${patient.id}`, { data }, { // update patient
      params: {
        'populate': '*',
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data
  } catch (error) {

    return null;
  }
}

// CASES

export async function createEmptyCase(token: string): Promise<PatientFields | null> {
  try {
    const response = await strapi.post('/cases', {}, {
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

export async function updateCaseByUuid(uuid: string, data: FieldsUpdate<CaseFields>, token: string): Promise<Data<CaseFields> | null> {
  try {
    const caseData = await getCaseByUuid(uuid, token); // get case by uuid

    if (!caseData) return null;

    const response = await strapi.put(`/cases/${caseData.id}`, { data }, { // update case
      params: {
        'populate': 'patient, location, diagnoses, primary_care_physician, primary_care_physician.user, primary_care_physician.user.role, nurse, nurse.user, nurse.user.role, observations, consultations, consultations.medical_notes, consultations.ai_consultations, resource, localizations',
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

export async function createOrUpdateCaseByUuid(uuid: string, data: FieldsUpdate<CaseFields>, token: string): Promise<Data<CaseFields> | null> {
  try {
    const caseData = await getCaseByUuid(uuid, token); // get case by uuid

    if (!caseData) {
      const response = await strapi.post('/cases', { data }, { // create patient
        params: {
          'populate': 'patient, location, diagnoses, primary_care_physician, primary_care_physician.user, primary_care_physician.user.role, nurse, nurse.user, nurse.user.role, observations, consultations, consultations.medical_notes, consultations.ai_consultations, resource, localizations',
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data;
    }

    const response = await strapi.put(`/cases/${caseData.id}`, { data }, { // update patient
      params: {
        'populate': 'patient, location, diagnoses, primary_care_physician, primary_care_physician.user, primary_care_physician.user.role, nurse, nurse.user, nurse.user.role, observations, consultations, consultations.medical_notes, consultations.ai_consultations, resource, localizations',
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data
  } catch (error) {

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

// OBSERVATIONS

export async function getObservationByUuid(uuid: string, token: string): Promise<Data<ObservationFields> | null> {
  try {
    const response = await strapi.get('/observations', {
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

export async function getObservationsByCaseUuid(uuid: string, token: string): Promise<Data<ObservationFields>[] | null> {
  try {
    const response = await strapi.get('/observations', {
      params: {
        'populate': '*',
        'filters[case][uuid]': uuid,
        'sort': 'createdAt:desc',
        'pagination[limit]': 100,
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

export async function getObservationsByCaseId(id: string, token: string): Promise<Data<ObservationFields>[] | null> {
  try {
    const response = await strapi.get('/observations/by-case/' + id, {
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

export async function getObservationsHistory(caseId: string|number, fhirId: string, token: string): Promise<Data<ObservationFields>[] | null> {
  try {
    const response = await strapi.get('/observations', {
      params: {
        'populate': '*',
        'filters[case]': caseId,
        'filters[fhir_id]': fhirId,
        'sort': 'createdAt:desc',
        'pagination[limit]': 100,
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

export async function updateObservationByUuid(uuid: string, data: FieldsUpdate<ObservationFields>, token: string): Promise<Data<ObservationFields> | null> {
  try {
    const observation = await getObservationByUuid(uuid, token); // get observation by uuid

    if (!observation) return null;

    const response = await strapi.put(`/observations/${observation.id}`, { data }, { // update observation
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

export async function createOrUpdateObservationByUuid(uuid: string, data: FieldsUpdate<ObservationFields>, token: string): Promise<Data<ObservationFields> | null> {
  try {
    const observation = await getObservationByUuid(uuid, token); // get observation by uuid

    if (!observation) {
      const response = await strapi.post('/observations', { data }, { // create observation
        params: {
          'populate': '*',
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data;
    }

    const response = await strapi.put(`/observations/${observation.id}`, { data }, { // update observation
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

export async function deleteObservation(id: number|string, token: string): Promise<boolean> {
  try {
    const response = await strapi.delete(`/observations/${id}`, {
      params: {
        'populate': '*',
      },
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

// AI REPORTS

export async function createAiReport(caseUuid: string, token: string): Promise<AiReportFields | null> {
  console.log('Creating AI report for case:', caseUuid);
  try {
    const response = await strapi.post('/ai-report/create', {
      case: {
        uuid: caseUuid,
      }
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.error)
      throw new Error(response.data.error);
    
    return response.data;
  } catch (error) {
    console.log(error);

    return null;
  } finally {
    console.log('AI report created for case:', caseUuid);
  }
}

export async function getAiReportByUuid(uuid: string, token: string): Promise<Data<AiReportFields> | null> {
  try {
    const response = await strapi.get('/ai-reports', {
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

export async function getAiReportsByCaseUuid(uuid: string, token: string): Promise<Data<AiReportFields>[] | null> {
  try {
    const response = await strapi.get('/ai-reports', {
      params: {
        'populate': '*',
        'filters[case][uuid]': uuid,
        'sort': 'createdAt:desc',
        'pagination[limit]': 100,
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

export async function getAiReportsByCaseId(id: string, token: string): Promise<Data<AiReportFields>[] | null> {
  try {
    const response = await strapi.get('/ai-reports', {
      params: {
        'populate': '*',
        'filters[case]': id,
        'sort': 'createdAt:desc',
        'pagination[limit]': 100,
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

export async function getAiReportNeedsUpdate(caseUuid: string, token: string): Promise<boolean | null> {
  try {
    const response = await strapi.get(`/ai-report/update/${caseUuid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.update;
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

// MEDICAL NOTES

export async function createEmptyMedicalNote(consultationId: string | number, token: string): Promise<MedicalNoteFields | null> {
  try {
    const response = await strapi.post('/medical-notes', { data: { consultation: consultationId } }, {
      params: {
        'populate': '*',
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);

    return null;
  }
}

export async function getMedicalNoteByUuid(uuid: string, token: string): Promise<Data<MedicalNoteFields> | null> {
  try {
    const response = await strapi.get('/medical-notes', {
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

export async function updateMedicalNoteByUuid(uuid: string, data: FieldsUpdate<MedicalNoteFields>, token: string): Promise<Data<MedicalNoteFields> | null> {
  try {
    const medicalNote = await getMedicalNoteByUuid(uuid, token); // get medical note by uuid

    if (!medicalNote) return null;

    const response = await strapi.put(`/medical-notes/${medicalNote.id}`, { data }, { // update medical note
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

export async function createOrUpdateMedicalNoteByUuid(uuid: string, data: FieldsUpdate<MedicalNoteFields>, token: string): Promise<Data<MedicalNoteFields> | null> {
  try {
    const medicalNote = await getMedicalNoteByUuid(uuid, token); // get medical note by uuid

    if (!medicalNote) {
      const response = await strapi.post('/medical-notes', { data }, { // create medical note
        params: {
          'populate': '*',
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return {
        id: response.data.id,
        attributes: {
          ...response.data,
        },
      };
    }

    const response = await strapi.put(`/medical-notes/${medicalNote.id}`, { data }, { // update medical note
      params: {
        'populate': '*',
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data
  } catch (error) {

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

    const aiConsultations: Data<AiConsultationFields>[] = consultation.attributes.ai_consultations.data;

    let userAiConsultation = aiConsultations.find(aiConsultation => aiConsultation.attributes.user.data?.id === userId) ?? null

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

// AUTHENTICATION

export async function forgotPassword(email: string): Promise<boolean> {
  try {
    const response = await strapi.post('/auth/forgot-password', { email });

    return response.status === 200;
  } catch (error) {
    console.log(error);

    return false;
  }
}

export async function resetPassword(code: string, password: string, passwordConfirmation: string): Promise<boolean> {
  try {
    const response = await strapi.post('/auth/reset-password', { code, password, passwordConfirmation });

    return response.status === 200;
  } catch (error) {
    console.log(error);

    return false;
  }
}

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