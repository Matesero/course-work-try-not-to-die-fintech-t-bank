export type Patient = {
    id: string;
    createTime?: string;
    name: string;
    birthday: string;
    gender: 'Male' | 'Female';
};

export type Pagination = {
    count: number;
    current: number;
    size: number;
};

export type Conclusion = 'Disease' | 'Recovery' | 'Death';

export type Params = {
    name?: string;
    conclusions?: string[];
    sorting?:
        | 'NameAsc'
        | 'NameDesc'
        | 'CreateAsc'
        | 'CreateDesc'
        | 'InspectionAsc'
        | 'InspectionDesc';
    scheduledVisits?: string;
    onlyMine?: string;
    grouped?: string;
    icdRoots?: string[];
    size?: string;
    page?: string;
    start?: string;
    end?: string;
};

export type Diagnosis = {
    code: string;
    createTime: string;
    description: string;
    id: string;
    name: string;
    type: string;
};

export type Consultation = {
    id: string;
    createTime: string;
    date: string;
    conclusion: string;
    diagnosis: Diagnosis;
    doctor: string;
    doctorId: string;
    hasChain: boolean;
    hasNested: boolean;
    patient: string;
    patientId: string;
    previousId: string;
};

export type User = {
    name: string;
    id: string;
    email: string;
    phone: string;
    gender: 'Male' | 'Female';
    createTime: string;
    birthday: string;
};

export type Author = User;

export type Speciality = {
    id: string;
    createTime: string;
    name: string;
};

export type Icd = {
    id: string;
    createTime: string;
    code: string;
    name: string;
};

export type Comment = {
    id: string;
    createTime: string;
    parentId: string;
    content: string;
    author: string;
    authorId: string;
    modifiedDate: string;
};

export type Consultations = {
    id: string;
    createTime: string;
    inspectionId: string;
    speciality: Speciality;
    rootComment: Comment & {
        author: Author;
    };
    commentsNumber: number;
}[];

export type ConsultationFull = {
    id: string;
    createTime: string;
    inspectionId: string;
    speciality: Speciality;
    comments: Comment[];
};

export type Inspection = {
    id: string;
    createTime: string;
    date: string;
    anamnesis: string;
    complaints: string;
    treatment: string;
    conclusion: Conclusion;
    nextVisitDate: string;
    deathDate: string;
    baseInspectionId: string;
    previousInspectionId: string;
    patient: Patient;
    doctor: User;
    diagnoses: Diagnosis[];
    consultations: Consultations;
};

type ReportFilters = {
    start: string;
    end: string;
    icdRoots: string[];
};

type Summary = {
    [key: string]: number;
};

type ReportRecord = {
    patientName: string;
    patientBirthdate: string;
    gender: 'Male' | 'Female';
    visitsByRoot: Summary;
};

export type Report = {
    filters: ReportFilters;
    records: ReportRecord[];
    summaryByRoot: Summary;
};

export type InspectionWithoutChild = {
    id: string;
    createTime: string;
    date: string;
    diagnosis: Diagnosis;
};

export type NewInspection = {
    patientId: string;
    date: string;
    anamnesis: string;
    complaints: string;
    treatment: string;
    conclusion: 'Disease' | 'Recovery' | 'Death';
    nextVisitDate: string | null;
    deathDate: string | null;
    previousInspectionId: string | null;
    diagnoses: {
        icdDiagnosisId: string;
        description: string;
        type: 'Main' | 'Concomitant' | 'Complication';
    }[];
    consultations:
        | {
              specialityId: string;
              comment: {
                  content: string;
              };
          }[]
        | null;
};
