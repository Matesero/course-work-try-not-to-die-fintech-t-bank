import { useEffect, useReducer } from 'react';
import type { FormEventHandler } from 'react';

import { reducer } from './reducer';
import { schema, zod2errors } from './schema';

import { medicalSystemApi } from '~/shared/api'
import { useNavigate } from 'react-router-dom';
import { sharedConfigRouter } from '~/shared/config';
const { dictionary, user } = medicalSystemApi;
const { RouteName } = sharedConfigRouter;

type Props = 'login' | 'register' | 'profile';

export const useForm = (formType: Props) => {
    const [state, dispatch] = useReducer(reducer, {
        isEditing: formType !== 'profile',
        isLoading: true,
        isUpload: false,
        specialties: [],
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSpecialties = async () => {
            try {
                const { data } = await dictionary.getSpecialties({ page: 1, size: 18 });

                if (data) {
                    dispatch({ type: 'finishResponse', payload: data.specialties });
                }
            } catch (error) {
                dispatch({ type: 'errorResponse' });
            }
        };

        console.log(state.specialties)

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

                switch (formType) {
                    case 'login':
                        await user.login(params);
                        navigate({ pathname: RouteName.PATIENTS_PAGE })
                        break;
                    case 'register':
                        await user.register(params);
                        navigate({ pathname: RouteName.PATIENTS_PAGE })
                        break;
                    case 'profile':
                        await user.putProfile(params);
                        break
                    default:
                        throw new Error('Не указан тип формы');
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
