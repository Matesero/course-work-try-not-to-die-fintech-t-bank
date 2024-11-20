import {
    type FormEventHandler,
    useEffect,
    useReducer,
    useRef,
    useState,
} from 'react';
import { useSelector } from 'react-redux';

import { Action, State, reducer } from '../model/reducer';
import { schema, zod2errors } from '../model/schema';

import { getIcd } from '~/shared/api/medicalSystem/dictionary';
import { postNewInspection } from '~/shared/api/medicalSystem/patient';
import { patientSlice, dictionarySlice, inspectionSlice } from '~/shared/store';
const patientSelectors = patientSlice.selectors;
const dictionarySelectors = dictionarySlice.selectors;
const inspectionSelectors = inspectionSlice.selectors;
import { setIcd } from '~/shared/store/dictionary/store';
import { useAppDispatch } from '~/shared/store/store';

export const useForm = () => {
    const prevInspection = useSelector(inspectionSelectors.prevInspection);
    const [state, dispatch] = useReducer<React.Reducer<State, Action>>(
        reducer,
        {
            isFirst: !prevInspection,
            prevInspection: prevInspection ?? '',
            hasMainDiagnosis: false,
            needConsultation: false,
            consultations: [],
            diagnoses: [],
            conclusion: undefined,
        },
    );
    const [searchIcd, setSearchIcd] = useState('');
    const [selectedDiagnosisType, setSelectedDiagnosisType] = useState<
        string | null
    >(null);
    const icd = useSelector(dictionarySelectors.icd);
    const patientId = useSelector(patientSelectors.id);
    const inspectionsWithoutChild = useSelector(
        patientSelectors.inspectionsWithoutChild,
    );
    const rootCommentRef = useRef<HTMLTextAreaElement>(null);
    const specialtyRef = useRef<HTMLInputElement>(null);
    const diagnosisRef = useRef<HTMLInputElement>(null);
    const diagnosisDescRef = useRef<HTMLTextAreaElement>(null);
    const appDispatch = useAppDispatch();

    const toggleIsFirst = () => {
        if (!prevInspection) {
            dispatch({ type: 'changeIsFirst', payload: false });
            return;
        }

        dispatch({ type: 'changeIsFirst', payload: !state.isFirst });
    };

    const handleChangeConclusion = (value: string) => {
        dispatch({ type: 'changeConclusion', payload: value });
    };

    const onHandleChangePrevInspection = (value: string) => {
        dispatch({ type: 'changePrevInspection', payload: value });
    };

    const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchIcd(event.target.value);
    };

    const onSwitchNeedConsultation = () => {
        dispatch({ type: 'switchNeedConsultation' });
    };

    const onSwitchIsFirst = () => {
        dispatch({ type: 'switchIsFirst' });
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (searchIcd.trim()) {
                appDispatch(getIcd({ page: 1, size: 300, request: searchIcd }));
            } else {
                appDispatch(setIcd([]));
            }
        }, 1000);

        return () => clearTimeout(timeout);
    }, [searchIcd, appDispatch]);

    const onAddConsultation = () => {
        const specialityId = specialtyRef.current?.value;
        const content = rootCommentRef.current?.value;
        dispatch({ type: 'errorForm', payload: {} });

        if (specialityId && content) {
            if (
                state.consultations.find(
                    (consultation) =>
                        specialityId === consultation.specialityId,
                )
            ) {
                dispatch({
                    type: 'errorForm',
                    payload: {
                        speciality:
                            'Уже есть консультация с данной специализацией',
                    },
                });
                return;
            }

            const newConsultation = {
                specialityId,
                comment: {
                    content,
                },
            };

            dispatch({ type: 'addConsultation', payload: newConsultation });
            dispatch({ type: 'switchNeedConsultation' });

            specialtyRef.current.value = '';
            rootCommentRef.current.value = '';
        }

        if (!content) {
            dispatch({
                type: 'errorForm',
                payload: {
                    content: 'Это поле обязательное',
                },
            });
        }

        if (!content) {
            dispatch({
                type: 'errorForm',
                payload: {
                    content: 'Это поле обязательное',
                },
            });
        }
    };

    const onAddDiagnosis = () => {
        const icdDiagnosisId = diagnosisRef.current?.value;
        const description = diagnosisDescRef.current?.value;
        dispatch({ type: 'errorForm', payload: {} });

        if (icdDiagnosisId && description && selectedDiagnosisType) {
            const newDiagnosis = {
                icdDiagnosisId,
                description,
                type: selectedDiagnosisType,
            };

            dispatch({ type: 'addDiagnosis', payload: newDiagnosis });

            if (selectedDiagnosisType === 'Main') {
                dispatch({ type: 'addMainDiagnoses' });
            }

            diagnosisRef.current.value = '';
            diagnosisDescRef.current.value = '';
            setSelectedDiagnosisType(null);
        }
    };

    const onRadioChange = (e) => {
        setSelectedDiagnosisType(e.target.value);
    };

    const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = schema.safeParse(Object.fromEntries(formData));

        if (data.success) {
            try {
                dispatch({ type: 'startUpload' });
                const params = {
                    ...data.data,
                    diagnoses: state.diagnoses,
                    consultations: state.consultations,
                };

                if (!params['deathDate']) {
                    params['deathDate'] = '';
                }

                if (!params['nextVisitDate']) {
                    params['nextVisitDate'] = '';
                }

                if (!params['previousInspectionId']) {
                    params['previousInspectionId'] = '';
                }

                await appDispatch(
                    postNewInspection({ id: patientId, ...params }),
                );

                dispatch({ type: 'finishUpload' });
            } catch (error) {
                dispatch({ type: 'errorResponse' });
            }
        } else {
            dispatch({ type: 'errorForm', payload: zod2errors(data.error) });
        }
    };

    return {
        state,
        icd,
        dispatch,
        toggleIsFirst,
        handleChangeSearch,
        handleChangeConclusion,
        onAddConsultation,
        onAddDiagnosis,
        onRadioChange,
        onSwitchIsFirst,
        onHandleChangePrevInspection,
        onSwitchNeedConsultation,
        inspectionsWithoutChild,
        setSelectedDiagnosisType,
        onSubmit,
        refs: {
            rootCommentRef,
            specialtyRef,
            diagnosisRef,
            diagnosisDescRef,
        },
    };
};
