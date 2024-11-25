import {
    ChangeEvent,
    type FormEventHandler,
    useEffect,
    useReducer,
    useRef,
    useState,
} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SelectValue } from 'react-tailwindcss-select/dist/components/type';

import { Action, State, reducer } from '../model/reducer';
import { schema, zod2errors } from '../model/schema';

import { medicalSystemApi } from '~/shared/api';
import { sharedConfigTypes } from '~/shared/config';
import { patientSlice, dictionarySlice, inspectionSlice } from '~/shared/store';
import { useAppDispatch } from '~/shared/store/store';

const patientSelectors = patientSlice.selectors;
const dictionarySelectors = dictionarySlice.selectors;
const inspectionSelectors = inspectionSlice.selectors;
const { getIcd } = medicalSystemApi.dictionary;
const { postNewInspection } = medicalSystemApi.patient;
const { setIcd } = dictionarySlice.store;

type Option = {
    value: string;
    label: string;
};

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
    const prevInspectionData = useSelector(inspectionSelectors.data);
    const rootCommentRef = useRef<HTMLTextAreaElement>(null);
    const specialtyRef = useRef<HTMLInputElement>(null);
    const diagnosisRef = useRef<HTMLInputElement>(null);
    const diagnosisDescRef = useRef<HTMLTextAreaElement>(null);
    const appDispatch = useAppDispatch();
    const navigate = useNavigate();

    const toggleIsFirst = () => {
        if (!prevInspection) {
            dispatch({ type: 'changeIsFirst', payload: false });
            return;
        }

        dispatch({ type: 'changeIsFirst', payload: !state.isFirst });
    };

    const handleChangeConclusion = (
        value:
            | SelectValue
            | Option
            | Option[]
            | ChangeEvent<HTMLInputElement>
            | string,
    ) => {
        const payload =
            typeof value === 'string'
                ? value
                : ((value as any)?.value ??
                  (value as any)?.target?.value ??
                  '');

        dispatch({ type: 'changeConclusion', payload });
    };

    const onHandleChangePrevInspection = (
        value:
            | SelectValue
            | Option
            | Option[]
            | ChangeEvent<HTMLInputElement>
            | string,
    ) => {
        const payload =
            typeof value === 'string'
                ? value
                : ((value as any)?.value ??
                  (value as any)?.target?.value ??
                  '');

        dispatch({ type: 'changePrevInspection', payload });
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

        dispatch({
            type: 'errorForm',
            payload: {
                content: !content ? 'Это поле обязательное' : '',
                speciality: !specialityId ? 'Это поле обязательное' : '',
            },
        });
    };

    const onAddDiagnosis = () => {
        const icdDiagnosisId = diagnosisRef.current?.value;
        const description = diagnosisDescRef.current?.value;
        dispatch({ type: 'errorForm', payload: {} });

        if (
            state.diagnoses.find(
                (diagnosis) => diagnosis.icdDiagnosisId === icdDiagnosisId,
            )
        ) {
            dispatch({
                type: 'errorForm',
                payload: { diagnosis: 'Выбранная болезнь уже есть' },
            });
            return;
        }

        if (!icdDiagnosisId || !description) {
            dispatch({
                type: 'errorForm',
                payload: {
                    diagnosis: !icdDiagnosisId
                        ? 'Поле является обязательным'
                        : '',
                    diagnosisDescription: !description
                        ? 'Поле является обязательным'
                        : '',
                },
            });
        }

        if (icdDiagnosisId && description && selectedDiagnosisType) {
            const newDiagnosis = {
                icdDiagnosisId,
                description,
                type: selectedDiagnosisType as
                    | 'Main'
                    | 'Concomitant'
                    | 'Complication',
            };

            if (
                ['Main', 'Concomitant', 'Complication'].includes(
                    newDiagnosis.type,
                )
            ) {
                dispatch({ type: 'addDiagnosis', payload: newDiagnosis });
            }

            if (selectedDiagnosisType === 'Main') {
                dispatch({ type: 'addMainDiagnoses' });
            }

            diagnosisRef.current.value = '';
            diagnosisDescRef.current.value = '';
            setSelectedDiagnosisType(null);
        }
    };

    const onRadioChange = (e) => {
        dispatch({ type: 'errorForm', payload: {} });
        setSelectedDiagnosisType(e.target.value);
    };

    const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        dispatch({ type: 'errorForm', payload: {} });

        const formData = new FormData(e.currentTarget);
        const data = schema.safeParse(Object.fromEntries(formData));

        if (data.success) {
            try {
                dispatch({ type: 'startUpload' });

                const diagnoses: {
                    icdDiagnosisId: string;
                    description: string;
                    type: 'Main' | 'Concomitant' | 'Complication';
                }[] = state.diagnoses;

                const consultations:
                    | {
                          specialityId: string;
                          comment: {
                              content: string;
                          };
                      }[]
                    | null =
                    state.consultations.length > 0 ? state.consultations : null;

                if (
                    data.data.conclusion !== 'Death' &&
                    data.data.conclusion !== 'Disease' &&
                    data.data.conclusion !== 'Recovery'
                ) {
                    throw Error('Ошибка с значением заключения');
                }

                const conclusion: 'Disease' | 'Recovery' | 'Death' =
                    data.data.conclusion;

                const params: sharedConfigTypes.NewInspection = {
                    patientId: patientId as string,
                    date: data.data.date || '',
                    anamnesis: data.data.anamnesis || '',
                    complaints: data.data.complaints || '',
                    treatment: data.data.treatment || '',
                    conclusion,
                    nextVisitDate: data.data?.['nextVisitDate'] || null,
                    deathDate: data.data?.['deathDate'] || null,
                    previousInspectionId:
                        data.data?.['previousInspectionId'] || null,
                    diagnoses,
                    consultations,
                };

                if (
                    !params.diagnoses.find(
                        (diagnosis) => diagnosis.type === 'Main',
                    )
                ) {
                    dispatch({
                        type: 'errorForm',
                        payload: {
                            Diagnoses:
                                'Обязательно должен быть один диагноз с типом "Основной"',
                        },
                    });
                    return;
                }

                try {
                    await appDispatch(postNewInspection(params));
                    navigate({ pathname: `/patient/${patientId}` });
                } catch (error) {
                    throw new Error('Ошибка с отправкой нового осмотра');
                }

                dispatch({ type: 'finishUpload' });
            } catch (error) {
                dispatch({ type: 'errorResponse' });
            }
        } else {
            dispatch({
                type: 'errorForm',
                payload: {
                    ...zod2errors(data.error),
                    prevInspection:
                        !state.isFirst && !state?.['prevInspection']
                            ? 'Поле является обязательным'
                            : '',
                    diagnoses: !state?.diagnoses.find(
                        (diagnosis) => diagnosis.type === 'Main',
                    )
                        ? 'Обязательно должен быть один диагноз с типом "Основной"'
                        : '',
                },
            });
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
        prevInspectionData,
        onSwitchIsFirst,
        onHandleChangePrevInspection,
        onSwitchNeedConsultation,
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
