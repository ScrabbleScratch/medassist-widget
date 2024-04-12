import { createContext, useState, useEffect } from 'react';

// ** Custom hooks imports
import { useAuth } from '../hooks/useAuth';

// ** Utils imports
import { getAiAssistance, postAiAssistance } from '../utils/strapi';

// Case context fields
export type Conversation = {
  data: {
    content: string;
    timestamp: string;
  };
  type: 'human' | 'ai';
}[];

export type Practitioner = {
  email: string;
  family_name: string;
  given_name: string;
  uuid: string;
};

export type Provider = {
  name: string;
  description: string;
  website_url: string;
  legal_name: string;
  phone: string;
  email: string;
  host: string;
  uuid: string;
};

export type Platform = {
  name: string;
  description: string;
  uuid: string;
};

export type Patient = {
  name: string;
  gender: string;
  birth_date: string;
};

export type DataValuesType = {
  initParams: {
    practitionerUuid: string;
    patientUuid: string;
    caseContextUuid: string | null;
    platformUuid: string;
    providerUuid: string;
  },
  conversation: Conversation | null,
  practitioner: Practitioner | null,
  provider: Provider | null,
  platform: Platform | null,
  patient: Patient | null,
  loadData: () => void;
  getCompletion: (input: string) => Promise<void>|void;
};

const defaultProvider: DataValuesType = {
  initParams: {
    practitionerUuid: '',
    patientUuid: '',
    platformUuid: '',
    providerUuid: '',
    caseContextUuid: null,
  },
  conversation: null,
  practitioner: null,
  provider: null,
  platform: null,
  patient: null,
  loadData: () => {},
  getCompletion: () => {},
};

export const DataContext = createContext(defaultProvider);

type Props = {
  practitionerUuid: string;
  patientUuid: string;
  platformUuid: string;
  providerUuid: string;
  caseContextUuid?: string | null;
  children: React.ReactNode;
};

const DataController = ({ practitionerUuid, patientUuid, platformUuid, providerUuid, caseContextUuid, children }: Props) => {
  // ** Hooks
  const { token } = useAuth();

  // ** States
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [practitioner, setPractitioner] = useState<Practitioner | null>(null);
  const [provider, setProvider] = useState<Provider | null>(null);
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [patient, setPatient] = useState<Patient | null>(null);

  const loadData = async () => {
    if (!caseContextUuid) {
      console.log('Can not connect to chat because caseContextUuid is empty!');
      return;
    }

    if (!token) {
      console.error('Can not connect to chat because token is empty!');
      return;
    }

    getAiAssistance(practitionerUuid, caseContextUuid, platformUuid, providerUuid, token)
      .then(data => {
        setConversation(data?.conversation);
        setPractitioner(data?.practitioner);
        setProvider(data?.provider);
        setPlatform(data?.platform);

        const patientData = data?.case_context?.bundle?.entry?.find((entry: { resource: { resourceType: string }}) => entry.resource.resourceType === 'Patient')?.resource;
        if (patientData) setPatient({
          ...patientData,
          name: [...patientData.name[0].given, patientData.name[0].family].join(' '),
        });
      });
  };

  const getCompletion = async (input: string) => {
    if (!caseContextUuid) {
      console.log('Can not connect to chat because caseContextUuid is empty!');
      return;
    }

    if (!token) {
      console.error('Can not connect to chat because token is empty!');
      return;
    }

    await postAiAssistance(input, practitionerUuid, caseContextUuid, platformUuid, providerUuid, null, token)
      .then(data => {
        setConversation(data?.conversation);
        setPractitioner(data?.practitioner);
        setProvider(data?.provider);
        setPlatform(data?.platform);

        const patientData = data?.case_context?.bundle?.entry?.find((entry: { resourceType: string; }) => entry.resourceType === 'Patient')?.resource;
        if (patientData) setPatient({
          ...patientData,
          name: [...patientData.name[0].given, patientData.name[0].family].join(' '),
        });
      });
  };

  const values = {
    initParams: {
      practitionerUuid,
      patientUuid,
      platformUuid,
      providerUuid,
      caseContextUuid: caseContextUuid || null,
    },
    conversation,
    practitioner,
    provider,
    platform,
    patient,
    loadData,
    getCompletion,
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <DataContext.Provider value={values}>
      {token && children}
    </DataContext.Provider>
  );
};

export default DataController;