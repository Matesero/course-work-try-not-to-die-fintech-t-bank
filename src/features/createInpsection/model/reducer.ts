type Consultation = {
    specialityId: string;
    comment: {
        content: string;
    };
};

type Diagnosis = {
    icdDiagnosisId: string;
    description: string;
    type: 'Main' | 'Concomitant' | 'Complication';
};

export type State = {
    isFirst: boolean;
    prevInspection?: string;
    hasMainDiagnosis: boolean;
    needConsultation: boolean;
    consultations: Consultation[];
    diagnoses: Diagnosis[];
    conclusion: 'Recovery' | 'Death' | 'Disease' | undefined;
    isUpload?: boolean;
    isLoading?: boolean;
    errors?: { [key: string]: string };
    error?: string;
};

export type Action =
    | { type: 'changeIsFirst'; payload: boolean }
    | { type: 'changePrevInspection'; payload: string }
    | { type: 'addConsultation'; payload: Consultation }
    | { type: 'addDiagnosis'; payload: Diagnosis }
    | { type: 'addMainDiagnoses' }
    | { type: 'switchNeedConsultation' }
    | { type: 'switchIsFirst' }
    | { type: 'errorForm'; payload: { [key: string]: string } }
    | { type: 'changeConclusion'; payload: string }
    | { type: 'startUpload' }
    | { type: 'finishUpload' }
    | { type: 'errorResponse' };

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'changeIsFirst':
            return { ...state, isFirst: action.payload };

        case 'changePrevInspection':
            return { ...state, prevInspection: action.payload };

        case 'addConsultation':
            return {
                ...state,
                consultations: [...state.consultations, action.payload],
            };

        case 'addMainDiagnoses':
            return {
                ...state,
                hasMainDiagnosis: true,
            };

        case 'addDiagnosis':
            return {
                ...state,
                diagnoses: [...state.diagnoses, action.payload],
            };

        case 'switchNeedConsultation':
            return { ...state, needConsultation: !state.needConsultation };

        case 'switchIsFirst':
            return { ...state, isFirst: !state.isFirst };

        case 'changeConclusion':
            return {
                ...state,
                conclusion: action.payload as 'Recovery' | 'Death' | 'Disease',
            };

        case 'errorForm':
            return { ...state, errors: action.payload };

        case 'startUpload':
            return { ...state, isUpload: true, ...state };

        case 'finishUpload':
            return state.isUpload || state.isLoading ? { ...state } : state;

        case 'errorResponse':
            return state.isUpload
                ? {
                      ...state,
                      error: 'Ошибка. Попробуйте еще раз',
                      isUpload: false,
                  }
                : state;
    }

    return state;
};
