import { createContext, useState, useEffect } from 'react';

// ** Custom hooks imports
import { useAuth } from '../hooks/useAuth';

// ** Utils imports
import { getAiConsultationByUuid } from '../utils/strapi';

// ** Types imports
import type { Data, AiConsultationFields, ConsultationFields, CaseFields, PatientFields } from '../utils/strapi/types';

export type DataValuesType = {
  aiConsultation: Data<AiConsultationFields> | null;
  consultation: Data<ConsultationFields> | null;
  caseData: Data<CaseFields> | null;
  patient: Data<PatientFields> | null;
};

const defaultProvider: DataValuesType = {
  aiConsultation: null,
  consultation: null,
  caseData: null,
  patient: null,
};

export const DataContext = createContext(defaultProvider);

type Props = {
  aiConsultationUuid: string;
  children: React.ReactNode;
};

const DataController = ({ aiConsultationUuid, children }: Props) => {
  // ** Hooks
  const { token } = useAuth();

  // ** States
  const [aiConsultation, setAiConsultation] = useState<Data<AiConsultationFields> | null>(null);
  const [consultation, setConsultation] = useState<Data<ConsultationFields> | null>(null);
  const [caseData, setCaseData] = useState<Data<CaseFields> | null>(null);
  const [patient, setPatient] = useState<Data<PatientFields> | null>(null);

  const values = {
    aiConsultation,
    consultation,
    caseData,
    patient,
  };

  useEffect(() => {
    if (!token) return;
    getAiConsultationByUuid(aiConsultationUuid, token)
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
    <DataContext.Provider value={values}>
      {token && children}
    </DataContext.Provider>
  );
};

export default DataController;