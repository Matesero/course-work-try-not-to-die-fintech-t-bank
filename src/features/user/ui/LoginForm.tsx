import React from 'react';
import { useNavigate } from 'react-router-dom';

import { FormWrapper } from './FormWrapper';
import { useForm } from '../model/useForm';

import { sharedConfigRouter } from '~/shared/config';
import { InputField, Button } from '~/shared/ui/components';
const { RouteName } = sharedConfigRouter;

export const LoginForm = () => {
    const [{ errors }, onSubmit] = useForm('login');

    const navigate = useNavigate();
    const handleRegisterClick = () =>
        navigate({ pathname: RouteName.REGISTRATION_PAGE });

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
                <Button
                    text="Регистрация"
                    bgColor="primary-gray"
                    onClick={handleRegisterClick}
                />
            </div>
        </FormWrapper>
    );
};
