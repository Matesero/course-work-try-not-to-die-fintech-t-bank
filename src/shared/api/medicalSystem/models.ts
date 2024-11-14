export type Specialty = {
    name: string;
    id: string;
    createTime: string;
};

export type Icd10 = {
    code: string;
    name: string;
    id: string;
    createTime: string;
};

export type User = {
    id: string;
    createTime: string;
    name: string;
    birthday: string;
    gender: 'Male' | 'Female';
    email: string;
    phone: string;
};
