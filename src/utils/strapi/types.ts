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
  role:             string | number | any;
  physician:        string | number | any;
  nurse:            string | number | any;
  location:         string | number | any;
  ai_consultations: (string | number)[] | any;
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
  cases:                          (string | number)[] | any;
};

export type ResourceFields = {
  name:         string,
  description:  string,
  type:         'Cubículo emergencias' | 'Habitación' | 'Quirófano' | 'Sala de choque' | 'Sala de rehabilitación' | 'Consultorio' | 'Sala de espera' | 'Rx' | 'Tomografía computarizad' | 'Resonancia Magnética' | 'Ultrasonido' | 'Electrocardiograma',
  available:    boolean,
  location:     string | number | any,
  picture:      (string | number)[] | any,
};

export type CaseFields = {
  title:                  string;
  description:            string;
  status:                 'Triaje' | 'Urgencias' | 'Consulta' | 'Interno' | 'Ambulatorio' | 'Observación' | 'Seguimiento externo' | 'Alta';
  location:               string | number | any;
  patient:                string | number | any;
  primary_care_physician: string | number | any;
  nurse:                  string | number | any;
  resource:               string | number | any;
  observations:           (string | number)[] | any;
  consultations:          (string | number)[] | any;
  diagnoses:              (string | number)[] | any;
  ai_reports:             (string | number)[] | any;
};

export type ObservationFields = {
  description:  string;
  ai_assisted:  boolean;
  json:         any;
  fhir_id:      string;
  unit:         string;
  value:        string;
  time:         string;
  user:         string | number | any;
  case:         string | number | any;
  images:       (string | number)[] | any;
};

export type PhysicianFields = {
  professional_id:  string;
  user:             string | number | any;
  providers:        (string | number)[] | any;
  cases:            (string | number)[] | any;
  ai_consultations: (string | number)[] | any;
};

export type NurseFields = {
  user:   string | number | any;
  cases:  (string | number)[] | any;
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
  physician:                string | number | any;
  case:                     string | number | any;
  ai_consultations:         (string | number)[] | any;
  medical_notes:            (string | number)[] | any;
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
  case:             string | number | any;
  consultations:    (string | number)[] | any;
  observations:     (string | number)[] | any;
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
  consultation:       string | number | any;
  physician:          string | number | any;
  user:               string | number | any;
  files:              (string | number)[] | any;
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
  consultation:           string | number | any;
  media:                  (string | number)[] | any;
};

// DATA

export type Relation<T> = {
  data: T;
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
  [K in keyof T]?: T[K];
}

export type Creation<T> = {
  id: number;
} & T;
