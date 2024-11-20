import React from 'react';
import { useSelector } from 'react-redux';

import { FormWrapper } from './FormWrapper';
import { useForm } from '../model';

import { sharedConfigOptions } from '~/shared/config';
import { userSlice } from '~/shared/store';
import { sharedUiComponents } from '~/shared/ui';
const { selectors } = userSlice;

const { InputField, Button, Select, Datepicker } = sharedUiComponents;

export const ProfileForm = () => {
    const user = useSelector(selectors.user);
    const [{ isEditing, errors }, onSubmit, onSwitch] = useForm('profile');

    return (
        <FormWrapper title={'Профиль'} onSubmit={onSubmit}>
            <div className="flex flex-col gap-4">
                <InputField
                    type="text"
                    label="ФИО"
                    name="name"
                    defaultValue={user?.name}
                    placeholder="Иванов Иван Иванович"
                    disabled={!isEditing}
                    error={errors?.['name'] ?? ''}
                />
                <div className="flex flex-row justify-between">
                    <Select
                        label="Пол"
                        name="gender"
                        defaultValue={user?.gender}
                        options={sharedConfigOptions.gender}
                        classNames="w-5/12"
                        disabled={!isEditing}
                        error={errors?.['gender'] ?? ''}
                    />
                    <Datepicker
                        label="Дата рождения"
                        name="birthday"
                        defaultValue={user?.birthday}
                        asSingle={true}
                        useRange={false}
                        disabled={!isEditing}
                        className="w-5/12"
                        error={errors?.['birthday'] ?? ''}
                    />
                </div>
                <InputField
                    label="Номер телефона"
                    type="phone"
                    name="phone"
                    defaultValue={user?.phone}
                    placeholder="+7 (xxx) xxx-xx-xx"
                    disabled={!isEditing}
                    error={errors?.['phone'] ?? ''}
                />
                <InputField
                    type="text"
                    name="email"
                    label="Email"
                    defaultValue={user?.email}
                    placeholder="name@example.com"
                    disabled={!isEditing}
                    error={errors?.['email'] ?? ''}
                />
                <div className="flex flex-col">
                    {isEditing && (
                        <Button text="Сохранить изменения" type="submit" />
                    )}
                    <Button
                        text={isEditing ? 'Отмена' : 'Редактировать'}
                        bgColor={isEditing ? 'primary-gray' : 'primary-orange'}
                        onClick={onSwitch}
                    />
                </div>
            </div>
        </FormWrapper>
    );
};
