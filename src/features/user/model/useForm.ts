import React, { useEffect, useReducer } from 'react';
import type { FormEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';

import { Action, reducer } from './reducer';
import { State } from './reducer';
import { schema, zod2errors } from './schema';

import { medicalSystemApi } from '~/shared/api';
import { sharedConfigRouter } from '~/shared/config';
const { dictionary, user } = medicalSystemApi;
const { RouteName } = sharedConfigRouter;

type Props = 'login' | 'register' | 'profile';

export const useForm = (formType: Props) => {
    const [state, dispatch] = useReducer<React.Reducer<State, Action>>(
        reducer,
        {
            isEditing: formType !== 'profile',
            isLoading: true,
            isUpload: false,
            specialties: [],
        },
    );
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSpecialties = async () => {
            try {
                const { data } = await dictionary.getSpecialties({
                    page: 1,
                    size: 18,
                });

                if (data) {
                    dispatch({
                        type: 'finishResponse',
                        payload: data.specialties,
                    });
                }
            } catch (error) {
                dispatch({ type: 'errorResponse' });
            }
        };

        fetchSpecialties();
    }, []);

    const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

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
                    specialty,
                    birthday,
                } = params;

                // console.error в дальнейшем в уведомление
                switch (formType) {
                    case 'login':
                        if (email && password) {
                            await user.login({ email, password });
                            navigate({ pathname: RouteName.PATIENTS_PAGE });
                        } else {
                            console.error('Почты и пароля нет');
                        }
                        break;

                    case 'register':
                        if (
                            email &&
                            password &&
                            phone &&
                            name &&
                            specialty &&
                            birthday &&
                            gender === ('Male' || 'Female')
                        ) {
                            await user.register({
                                email,
                                password,
                                phone,
                                name,
                                specialty,
                                birthday,
                                gender,
                            });
                            navigate({ pathname: RouteName.PATIENTS_PAGE });
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
                            navigate({ pathname: RouteName.PATIENTS_PAGE });
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
