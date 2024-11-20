import React, { useReducer } from 'react';
import type { FormEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';

import { Action, reducer } from './reducer';
import { State } from './reducer';
import { schema, zod2errors } from './schema';

import { medicalSystemApi } from '~/shared/api';
import { getProfile, login, register } from '~/shared/api/medicalSystem/user';
import { sharedConfigRouter } from '~/shared/config';
import { useAppDispatch } from '~/shared/store/store';

const { user, patient } = medicalSystemApi;
const { RouteName } = sharedConfigRouter;

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
            isEditing: formType !== 'profile',
            isLoading: true,
            isUpload: false,
        },
    );
    const appDispatch = useAppDispatch();
    const navigate = useNavigate();

    const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = schema.safeParse(Object.fromEntries(formData));

        console.log(data);

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

                // console.error в дальнейшем в уведомление
                switch (formType) {
                    case 'login':
                        if (email && password) {
                            await appDispatch(login({ email, password }));
                            navigate({ pathname: RouteName.PATIENTS_PAGE });
                        } else {
                            console.error('Почты и пароля нет');
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
                            gender
                        ) {
                            await appDispatch(
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
                            navigate({ pathname: RouteName.PATIENTS_PAGE });
                        } else {
                            console.error('Данные введены неверно');
                        }
                        break;

                    case 'registerPatient':
                        if (name && patientBirthday && gender) {
                            await patient.register({
                                name,
                                birthday: patientBirthday,
                                gender,
                            });
                        } else {
                            console.error('Данные введены неверно');
                        }
                        break;

                    case 'profile':
                        if (
                            email &&
                            phone &&
                            name &&
                            birthday &&
                            gender === ('Male' || 'Female')
                        ) {
                            await user.putProfile({
                                email,
                                phone,
                                name,
                                birthday,
                                gender,
                            });
                            await appDispatch(getProfile());
                        } else {
                            console.error('Данные введены неверно');
                        }
                        break;
                    default:
                        console.error('Не указан тип формы');
                }

                dispatch({ type: 'finishUpload' });
            } catch (error) {
                dispatch({ type: 'errorResponse' });
            }
        } else {
            dispatch({ type: 'errorForm', payload: zod2errors(data.error) });
        }
    };

    const onSwitch = () => dispatch({ type: 'switchIsEditing' });

    return [state, onSubmit, onSwitch] as const;
};
