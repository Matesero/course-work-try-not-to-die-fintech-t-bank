import React from 'react';

import { FormWrapper } from './FormWrapper';
import { useForm } from '../model/useForm';

import { sharedConfigOptions } from '~/shared/config';
import { specialtiesToOptions } from '~/shared/lib/specialtiesToOptions';
import { InputField, Button, Select, Datepicker } from '~/shared/ui/components';

export const RegisterForm = () => {
    const [{ errors, specialties }, onSubmit] = useForm('register');

    return (
        <FormWrapper title={'Регистрация'} onSubmit={onSubmit}>
            <div className="flex flex-col gap-4">
                <InputField
                    type="text"
                    name="ФИО"
                    placeholder="Иванов Иван Иванович"
                    error={errors?.['name'] ?? ''}
                />
                <div className="flex flex-row justify-between">
                    <Select
                        name="Пол"
                        options={sharedConfigOptions.gender}
                        classNames="w-5/12"
                        error={errors?.['gender'] ?? ''}
                    />
                    <Datepicker
                        className="w-5/12"
                        name="Дата рождения"
                        asSingle={true}
                        useRange={false}
                        error={errors?.['birthday'] ?? ''}
                    />
                </div>
                <InputField
                    type="phone"
                    name="Телефон"
                    placeholder="+7 (xxx) xxx-xx-xx"
                    error={errors?.['phone'] ?? ''}
                />
                <Select
                    name="Специальность"
                    options={specialtiesToOptions(specialties)}
                    isSearchable
                    error={errors?.['specialty'] ?? ''}
                />
                <InputField
                    type="text"
                    name="Email"
                    placeholder="name@example.com"
                    error={errors?.['email'] ?? ''}
                />
                <InputField
                    type="password"
                    name="Пароль"
                    placeholder="∗∗∗∗∗∗∗"
                    error={errors?.['password'] ?? ''}
                />
                <div className="flex flex-col gap-2">
                    <Button text="Зарегистрироваться" type="submit" />
                </div>
            </div>
        </FormWrapper>
    );
};
