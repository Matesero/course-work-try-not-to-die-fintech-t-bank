import React from 'react';

import { FormWrapper } from './FormWrapper';
import { useForm } from '../model/useForm';

import { medicalSystemApi } from '~/shared/api';
import { sharedConfigOptions } from '~/shared/config';
import { InputField, Button, Select, Datepicker } from '~/shared/ui/components';

type Props = {
    user: medicalSystemApi.models.User | null;
};

export const ProfileForm = ({ user }: Props) => {
    const [{ isEditing, errors }, onSubmit, onSwitch] = useForm('profile');

    return (
        <FormWrapper title={'Профиль'} onSubmit={onSubmit}>
            <div className="flex flex-col gap-4">
                <InputField
                    type="text"
                    name="ФИО"
                    defaultValue={user?.name}
                    placeholder="Иванов Иван Иванович"
                    disabled={!isEditing}
                    error={errors?.['name'] ?? ''}
                />
                <div className="flex flex-row justify-between">
                    <Select
                        name="Пол"
                        defaultValue={user?.gender}
                        options={sharedConfigOptions.gender}
                        classNames="w-5/12"
                        disabled={!isEditing}
                        error={errors?.['gender'] ?? ''}
                    />
                    <Datepicker
                        className="w-5/12"
                        name="Дата рождения"
                        defaultValue={user?.birthday}
                        asSingle={true}
                        useRange={false}
                        disabled={!isEditing}
                        error={errors?.['birthday'] ?? ''}
                    />
                </div>
                <InputField
                    type="phone"
                    name="Телефон"
                    defaultValue={user?.phone}
                    placeholder="+7 (xxx) xxx-xx-xx"
                    disabled={!isEditing}
                    error={errors?.['phone'] ?? ''}
                />
                <InputField
                    type="text"
                    name="Email"
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
