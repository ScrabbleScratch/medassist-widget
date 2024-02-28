// Fields

export type UserFields = {
  username:         string;
  email:            string;
  first_name:       string;
  middle_name:      string;
  last_name:        string;
  birthday:         string;
  gender:           'male' | 'female';
  bio:              string;
  phone:            string;
  cellphone:        string;
  provider:         string;
  confirmed:        boolean;
  blocked:          boolean;
  role:             string | number | object;
  physician:        Relation<Data<PhysicianFields>>;
  nurse:            Relation<Data<NurseFields>>;
  location:         string | number | object;
  ai_consultations: Relation<Data<AiConsultationFields>[]>;
};

export type ObservationField = 'desconocido' | 'negado' | 'presente';

export type PatientFields = {
  unknown_name:                   boolean;
  first_name:                     string;
  last_name:                      string;
  middle_name:                    string;
  mother_last_name:               string;
  birth_date:                     string;
  apparent_age:                   boolean;
  age:                            number;
  email:                          string;
  password:                       string
  phone:                          string;
  phone_verified:                 boolean;
  verification_code:              string;
  sex:                            'male' | 'female';
  apparent_gender:                boolean;
  gender:                         'male' | 'female' | 'both' | 'neither' | 'other';
  clinical_history:               string;
  family_member_first_name:       string;
  family_member_last_name:        string;
  family_member_relation:         string;
  family_member_phone:            string;
  family_member_email:            string;
  family_member_phone_verified:   boolean;
  hypertension:                   ObservationField;
  diabetes:                       ObservationField;
  chronic_degenerative_diseases:  string;
  allergies:                      string;
  surgeries:                      string;
  transfusions:                   string;
  traumatic:                      string;
  drug_addictions:                string;
  inheritance_history:            string;
  non_pathological_history:       string
  cases:                          Relation<Data<CaseFields>[]>;
};

export type ResourceFields = {
  name:         string,
  description:  string,
  type:         'Cubículo emergencias' | 'Habitación' | 'Quirófano' | 'Sala de choque' | 'Sala de rehabilitación' | 'Consultorio' | 'Sala de espera' | 'Rx' | 'Tomografía computarizad' | 'Resonancia Magnética' | 'Ultrasonido' | 'Electrocardiograma',
  available:    boolean,
  location:     string | number | object,
  picture:      (string | number)[] | object,
};

export type CaseFields = {
  title:                  string;
  description:            string;
  status:                 'Triaje' | 'Urgencias' | 'Consulta' | 'Interno' | 'Ambulatorio' | 'Observación' | 'Seguimiento externo' | 'Alta';
  location:               string | number | object;
  patient:                Relation<Data<PatientFields>>;
  primary_care_physician: Relation<Data<PhysicianFields>>;
  nurse:                  Relation<Data<NurseFields>>;
  resource:               Relation<Data<ResourceFields>>;
  observations:           Relation<Data<ObservationFields>[]>;
  consultations:          Relation<Data<ConsultationFields>[]>;
  diagnoses:              (string | number)[] | object;
  ai_reports:             Relation<Data<AiReportFields>[]>;
};

export type ObservationFields = {
  description:  string;
  ai_assisted:  boolean;
  json:         object;
  fhir_id:      string;
  unit:         string;
  value:        string;
  time:         string;
  user:         Relation<Data<UserFields>>;
  case:         Relation<Data<CaseFields>>;
  images:       (string | number)[] | object;
};

export type PhysicianFields = {
  professional_id:  string;
  user:             Relation<Data<UserFields>>;
  providers:        (string | number)[] | object;
  cases:            Relation<Data<CaseFields>[]>;
  ai_consultations: Relation<Data<AiConsultationFields>[]>;
};

export type NurseFields = {
  user:   Relation<Data<UserFields>>;
  cases:  Relation<Data<CaseFields>[]>;
};

export type PinFields = {
  xPercentage:  number,
  yPercentage:  number,
  bodyPart:     string;
  value:        string;
  comment:      string;
};

export type ConsultationFields = {
  symptoms:                 string;
  reason:                   string;
  patient_type:             'Adulto' | 'Obstetrico' | 'Pediatrico';
  entry_mode:               'Solo' | 'Amigo' | 'Ambulancia' | 'Familia' | 'Oficial' | 'Otro';
  patient_classification:   'green' | 'yellow' | 'red';
  physician:                Relation<Data<PhysicianFields>>;
  case:                     Relation<Data<CaseFields>>;
  ai_consultations:         Relation<Data<AiConsultationFields>[]>;
  medical_notes:            Relation<Data<MedicalNoteFields>[]>;
};

export type QuestionsAnswersFields = {
  data: {
    content:    string;
    timestamp:  string;
  };
  type:         'human' | 'ai';
};

export type DiagnoseFields = {
  diagnosis:    string;
  percentage:   number;
  explanation:  string;
  specialist:   string;
};

export type MedicalExamFields = {
  diagnosis:   string;
  exam:        string;
  explanation: string;
};

export type MedicalTestFields = {
  exams: MedicalExamFields[];
};

export type EmergencyIndexFields = {
  medicalEmergency: string;
  explanation:     string;
};

export type AiReportFields = {
  diagnose:         DiagnoseFields[];
  medical_tests:    MedicalTestFields;
  emergency_index:  EmergencyIndexFields;
  case:             Relation<Data<CaseFields>>;
  consultations:    Relation<Data<ConsultationFields>[]>;
  observations:     Relation<Data<ObservationFields>[]>;
};

export type AiConsultationFields = {
  context:            string;
  additional_details: string;
  medical_summary:    string;
  feedback:           string;
  approved:           boolean;
  tokens:             number;
  vital_signs:        string;
  questions_answers:  QuestionsAnswersFields[];
  content_patient:    string;
  ended:              string;
  user_type:          'médico' | 'paciente' | 'contacto primario' | 'profesional de la salud';
  consultation:       Relation<Data<ConsultationFields>>;
  physician:          Relation<Data<PhysicianFields>>;
  user:               Relation<Data<UserFields>>;
  files:              (string | number)[] | object;
};

export type MedicalNoteFields = {
  subjective:             string;
  objective:              string;
  assessment:             string;
  plan:                   string;
  ai_subjective:          string;
  ai_subjective_warnings: string;
  ai_objective:           string;
  ai_objective_warnings:  string;
  ai_assessment:          string;
  ai_assessment_warnings: string;
  ai_plan:                string;
  ai_plan_warnings:       string;
  completed:              boolean;
  consultation:           Relation<Data<ConsultationFields>>;
  media:                  (string | number)[] | object;
};

// DATA

export type Relation<T> = {
  data: T | null;
};

export type Attributes<T> = {
  uuid: string;
  createdAt: string;
  updatedAt: string;
} & {
  [K in keyof T]: T[K];
};

export type Data<T> = {
  id:         number;
  attributes: Attributes<T>;
};

export type FieldsUpdate<T> = {
  [K in keyof T]?: T[K] extends Relation<infer U>
    ? U extends Array<U>
      ? (number | string)[]
      : (number | string)
    : T[K];
};

export type Creation<T> = {
  id: number;
} & T;
