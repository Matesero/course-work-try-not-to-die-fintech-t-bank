import * as Sentry from '@sentry/react';
import React, { useReducer } from 'react';
import type { FormEventHandler } from 'react';

import { Action, State, reducer } from './reducer';
import { schema, zod2errors } from './schema';

import { medicalSystemApi } from '~/shared/api';
import { useAppDispatch } from '~/shared/store/store';

const { user, patient } = medicalSystemApi;
const { getProfile, login, putProfile, register } = medicalSystemApi.user;

type Props = 'login' | 'registerUser' | 'profile' | 'registerPatient';

export type FormResult = readonly [
    State,
    FormEventHandler<HTMLFormElement>,
    () => void,
];

export const useForm = (formType: Props): FormResult => {
    const [state, dispatch] = useReducer<React.Reducer<State, Action>>(
        reducer,
        {
            isEditing: false,
            isLoading: true,
            isUpload: false,
        },
    );
    const appDispatch = useAppDispatch();

    const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        dispatch({ type: 'errorForm', payload: {} });
        const formData = new FormData(e.currentTarget);
        const data = schema.safeParse(Object.fromEntries(formData));

        if (data.success) {
            try {
                dispatch({ type: 'startUpload' });
                const { data: params } = data;
                const {
                    email,
                    password,
                    phone,
                    name,
                    gender,
                    patientBirthday,
                    speciality,
                    birthday,
                } = params;

                switch (formType) {
                    case 'login':
                        if (email && password) {
                            const response = await appDispatch(
                                login({ email, password }),
                            );
                            if (login.rejected.match(response)) {
                                dispatch({
                                    type: 'errorForm',
                                    payload: {
                                        response:
                                            'Что-то пошло не так, проверьте введенные данные и попробуйте еще раз',
                                    },
                                });
                            }
                        }
                        break;

                    case 'registerUser':
                        if (
                            email &&
                            password &&
                            phone &&
                            name &&
                            speciality &&
                            birthday &&
                            (gender === 'Male' || gender === 'Female')
                        ) {
                            const response = await appDispatch(
                                register({
                                    email,
                                    password,
                                    phone,
                                    name,
                                    speciality,
                                    birthday,
                                    gender,
                                }),
                            );
                            if (register.rejected.match(response)) {
                                dispatch({
                                    type: 'errorForm',
                                    payload: {
                                        email: 'Введенная почта занята',
                                    },
                                });
                            }
                        }
                        break;

                    case 'registerPatient':
                        if (
                            name &&
                            patientBirthday &&
                            (gender === 'Male' || gender === 'Female')
                        ) {
                            await patient.register({
                                name,
                                birthday: patientBirthday,
                                gender,
                            });
                        }
                        break;

                    case 'profile':
                        if (
                            email &&
                            phone &&
                            name &&
                            birthday &&
                            (gender === 'Male' || gender === 'Female')
                        ) {
                            const response = await appDispatch(
                                user.putProfile({
                                    email,
                                    phone,
                                    name,
                                    birthday,
                                    gender,
                                }),
                            );
                            if (putProfile.rejected.match(response)) {
                                dispatch({
                                    type: 'errorForm',
                                    payload: {
                                        email: 'Введенная почта занята ',
                                    },
                                });
                                return;
                            } else {
                                await appDispatch(getProfile());
                            }
                        }
                        break;
                    default:
                        console.error('Не указан тип формы');
                }

                dispatch({ type: 'finishUpload' });
            } catch (error) {
                dispatch({ type: 'errorResponse' });
                Sentry.captureException(error);
            }
        } else {
            dispatch({ type: 'errorForm', payload: zod2errors(data.error) });
            Sentry.captureException(
                new Error(
                    'Ошибка валидации формы ' +
                        JSON.stringify(zod2errors(data.error)),
                ),
            );
        }
    };

    const onSwitch = () => dispatch({ type: 'switchIsEditing' });

    return [state, onSubmit, onSwitch] as const;
};
