import React, { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { FormWrapper } from './FormWrapper';
import { useForm } from '../model';

import { sharedConfigOptions } from '~/shared/config';
import { userSlice } from '~/shared/store';
import { sharedUiComponents } from '~/shared/ui';

const { InputField, Button, Select, Datepicker, Loading } = sharedUiComponents;
const { selectors } = userSlice;

type Option = { value: string; label: string };

export const ProfileForm = () => {
    const user = useSelector(selectors.user);
    const [{ isEditing, errors }, onSubmit, onSwitch] = useForm('profile');
    const [formValues, setFormValues] = useState(user);

    useEffect(() => {
        setFormValues(user);
    }, [user]);

    const handleCancel = () => {
        setFormValues(user);
        onSwitch();
    };

    const handleChange = (
        e: ChangeEvent<HTMLInputElement> | Option | Option[] | string,
    ) => {
        if (typeof e === 'string') {
            setFormValues((prev) => ({ ...prev, birthday: e }));
        } else if ('target' in e) {
            const target = (e as ChangeEvent<HTMLInputElement>).target;
            if (target?.name) {
                const { name, value } = target;
                setFormValues((prev) => ({ ...prev, [name]: value }));
            }
        } else if (Array.isArray(e)) {
            const firstOption = e[0];
            if (firstOption?.value) {
                setFormValues((prev) => ({
                    ...prev,
                    gender: firstOption.value,
                }));
            }
        } else if (e && 'value' in e) {
            const selectValue = e as Option;
            setFormValues((prev) => ({
                ...prev,
                gender: selectValue.value,
            }));
        }
    };

    if (!user) {
        return <Loading />;
    }

    return (
        <FormWrapper title={'Профиль'} onSubmit={onSubmit}>
            <div className="flex flex-col gap-4">
                <InputField
                    type="text"
                    label="ФИО"
                    name="name"
                    value={formValues.name}
                    placeholder="Иванов Иван Иванович"
                    onChange={handleChange}
                    disabled={!isEditing}
                    error={errors?.['name'] ?? ''}
                />
                <div className="flex flex-col lg:flex-row justify-between items-end gap-4">
                    <Select
                        label="Пол"
                        name="gender"
                        value={formValues.gender}
                        options={sharedConfigOptions.gender}
                        classNames="w-full"
                        onChange={handleChange}
                        disabled={!isEditing}
                        error={errors?.['gender'] ?? ''}
                    />
                    <Datepicker
                        label="Дата рождения"
                        name="birthday"
                        value={formValues.birthday}
                        asSingle={true}
                        useRange={false}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full"
                        error={errors?.['birthday'] ?? ''}
                    />
                </div>
                <InputField
                    label="Номер телефона"
                    type="phone"
                    name="phone"
                    value={formValues.phone}
                    placeholder="+7 (xxx) xxx-xx-xx"
                    onChange={handleChange}
                    disabled={!isEditing}
                    error={errors?.['phone'] ?? ''}
                />
                <InputField
                    type="text"
                    name="email"
                    label="Email"
                    value={formValues.email}
                    placeholder="name@example.com"
                    onChange={handleChange}
                    disabled={!isEditing}
                    error={errors?.['email'] ?? ''}
                />
                <div className="flex flex-col gap-2">
                    {isEditing && (
                        <Button label="Сохранить изменения" type="submit" />
                    )}
                    <Button
                        label={isEditing ? 'Отмена' : 'Редактировать'}
                        bgColor={isEditing ? 'primary-gray' : 'primary-orange'}
                        onClick={handleCancel}
                    />
                </div>
            </div>
        </FormWrapper>
    );
};
