import { createContext, useState, useEffect } from 'react';

// ** Utils imports
import { getAiConsultationByUuid } from '../utils/strapi';

// ** Types imports
import type { Data, AiConsultationFields, ConsultationFields, CaseFields, PatientFields } from '../utils/strapi/types';

export type AuthValuesType = {
  token: string | null;
  aiConsultation: Data<AiConsultationFields> | null;
  consultation: Data<ConsultationFields> | null;
  caseData: Data<CaseFields> | null;
  patient: Data<PatientFields> | null;
};

const defaultProvider: AuthValuesType = {
  token: null,
  aiConsultation: null,
  consultation: null,
  caseData: null,
  patient: null,
};

export const AuthContext = createContext(defaultProvider);

type Props = {
  apiToken: string;
  aiConsultationUuid: string;
  children: React.ReactNode;
};

const Authenticator = ({ apiToken, aiConsultationUuid, children }: Props) => {
  // ** States
  const [aiConsultation, setAiConsultation] = useState<Data<AiConsultationFields> | null>(null);
  const [consultation, setConsultation] = useState<Data<ConsultationFields> | null>(null);
  const [caseData, setCaseData] = useState<Data<CaseFields> | null>(null);
  const [patient, setPatient] = useState<Data<PatientFields> | null>(null);

  const values = {
    token: apiToken,
    aiConsultation,
    consultation,
    caseData,
    patient,
  };

  useEffect(() => {
    getAiConsultationByUuid(aiConsultationUuid, apiToken)
      .then((aiConsultationData: Data<AiConsultationFields> | null) => {
        setAiConsultation(aiConsultationData);
        const consultationData = aiConsultationData?.attributes.consultation?.data ?? null;
        setConsultation(consultationData);
        const caseData = consultationData?.attributes.case?.data ?? null;
        setCaseData(caseData);
        const patientData = caseData?.attributes.patient?.data ?? null;
        setPatient(patientData);
        console.log('PARSED DATA:', { aiConsultationData, consultationData, caseData, patientData });
      });
  }, []);

  return (
    <AuthContext.Provider value={values}>
      {apiToken && children}
    </AuthContext.Provider>
  );
};

export default Authenticator;