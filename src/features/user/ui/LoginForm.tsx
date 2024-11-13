import React from 'react';

import { FormWrapper } from './FormWrapper';
import { useForm } from '../model/useForm';

import { InputField, Button } from '~/shared/ui/components';

export const LoginForm = () => {
    const [{ errors }, onSubmit] = useForm('login');

    return (
        <FormWrapper title={'Профиль'} onSubmit={onSubmit}>
            <div className="flex flex-col gap-4">
                <InputField
                    type="text"
                    name="Email"
                    placeholder={'name@example.com'}
                    error={errors?.['email'] ?? ''}
                />
                <InputField
                    type="password"
                    name="Пароль"
                    placeholder={'∗∗∗∗∗∗∗'}
                    error={errors?.['password'] ?? ''}
                />
            </div>
            <div className="flex flex-col gap-2">
                <Button text="Войти" type="submit" />
                <Button text="Регистрация" bgColor="primary-gray" />
            </div>
        </FormWrapper>
    );
};
