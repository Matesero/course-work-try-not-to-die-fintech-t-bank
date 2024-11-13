import { useReducer } from 'react';
import type { FormEventHandler } from 'react';

import { reducer } from './reducer';
import { schema, zod2errors } from './schema';

type Props = 'login' | 'register' | 'profile';

export const useForm = (formType: Props) => {
    const [state, dispatch] = useReducer(reducer, {
        isEditing: formType !== 'profile',
    });

    const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = schema.safeParse(Object.fromEntries(formData));

        if (data.success) {
            try {
                dispatch({ type: 'startUpload' });

                // вставить запросы
                switch (formType) {
                    case 'login':
                        break;
                    case 'register':
                        break;
                    case 'profile':
                        break;
                }

                dispatch({ type: 'finishUpload' });
            } catch (e) {
                dispatch({ type: 'errorUpload' });
            }
        } else {
            dispatch({ type: 'errorForm', payload: zod2errors(data.error) });
        }
    };

    const onSwitch = () => dispatch({ type: 'switchIsEditing' });

    return [state, onSubmit, onSwitch] as const;
};
