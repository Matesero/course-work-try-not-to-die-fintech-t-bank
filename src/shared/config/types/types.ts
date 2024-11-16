export type Patient = {
    birthday: string;
    createTime: string;
    gender: 'Male' | 'Female';
    id: string;
    name: string;
};

export type Pagination = {
    count: number;
    current: number;
    size: number;
};

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
