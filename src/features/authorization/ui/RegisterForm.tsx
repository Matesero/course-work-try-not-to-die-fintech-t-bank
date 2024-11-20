import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { FormWrapper } from './FormWrapper';
import { useForm } from '../model';

import { getSpecialties } from '~/shared/api/medicalSystem/dictionary';
import { sharedConfigOptions } from '~/shared/config';
import { specialtiesToOptions } from '~/shared/lib/specialtiesToOptions';
import { dictionarySlice } from '~/shared/store';
import { useAppDispatch } from '~/shared/store/store';
import { sharedUiComponents } from '~/shared/ui';
import { Loading } from '~/shared/ui/components';

const { InputField, Button, Select, Datepicker } = sharedUiComponents;
const dictionarySelectors = dictionarySlice.selectors;

export const RegisterForm = () => {
    const [{ errors }, onSubmit] = useForm('registerUser');
    const appDispatch = useAppDispatch();
    const specialties = useSelector(dictionarySelectors.specialties);
    const isLoading = useSelector(dictionarySelectors.isLoading);

    useEffect(() => {
        if (!specialties.length) {
            appDispatch(getSpecialties({ size: 18, page: 1 }));
        }
    }, [appDispatch, specialties.length]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <FormWrapper title={'Регистрация'} onSubmit={onSubmit}>
            <div className="flex flex-col gap-4">
                <InputField
                    type="text"
                    label="ФИО"
                    name="name"
                    placeholder="Иванов Иван Иванович"
                    isRequired
                    error={errors?.['name'] ?? ''}
                />
                <div className="flex flex-col lg:flex-row justify-between">
                    <Select
                        label="Пол"
                        name="gender"
                        options={sharedConfigOptions.gender}
                        classNames="lg:w-5/12"
                        isRequired
                        error={errors?.['gender'] ?? ''}
                    />
                    <Datepicker
                        className="lg:w-5/12"
                        label="Дата рождения"
                        name="birthday"
                        asSingle={true}
                        useRange={false}
                        isRequired
                        error={errors?.['birthday'] ?? ''}
                    />
                </div>
                <InputField
                    type="phone"
                    label="Номер телефона"
                    name="phone"
                    placeholder="+7 (xxx) xxx-xx-xx"
                    isRequired
                    error={errors?.['phone'] ?? ''}
                />
                <Select
                    label="Специальность"
                    name="speciality"
                    options={specialtiesToOptions(specialties)}
                    isSearchable
                    isRequired
                    error={errors?.['speciality'] ?? ''}
                />
                <InputField
                    type="text"
                    label="Email"
                    name="email"
                    placeholder="name@example.com"
                    isRequired
                    error={errors?.['email'] ?? ''}
                />
                <InputField
                    type="password"
                    label="Пароль"
                    name="password"
                    placeholder="∗∗∗∗∗∗∗"
                    isRequired
                    error={errors?.['password'] ?? ''}
                />
                <div className="flex flex-col gap-2">
                    <Button text="Зарегистрироваться" type="submit" />
                </div>
            </div>
        </FormWrapper>
    );
};
