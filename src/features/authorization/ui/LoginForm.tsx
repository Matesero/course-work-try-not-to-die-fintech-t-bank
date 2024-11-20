import React from 'react';
import { useNavigate } from 'react-router-dom';

import { FormWrapper } from './FormWrapper';
import { useForm } from '../model';

import { sharedConfigRouter } from '~/shared/config';
import { sharedUiComponents } from '~/shared/ui';

const { RouteName } = sharedConfigRouter;
const { InputField, Button } = sharedUiComponents;

export const LoginForm = () => {
    const [{ errors }, onSubmit] = useForm('login');

    const navigate = useNavigate();
    const handleRegisterClick = () =>
        navigate({ pathname: RouteName.REGISTRATION_PAGE });

    return (
        <FormWrapper title={'Вход'} onSubmit={onSubmit}>
            <div className="flex flex-col gap-4">
                <InputField
                    type="text"
                    label="Email"
                    name="email"
                    placeholder={'name@example.com'}
                    isRequired
                    error={errors?.['email'] ?? ''}
                />
                <InputField
                    label="Пароль"
                    name="password"
                    placeholder={'∗∗∗∗∗∗∗'}
                    isRequired
                    type="password"
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
