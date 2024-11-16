import React from 'react';
import { useNavigate } from 'react-router-dom';

import { sharedConfigTypes } from '~/shared/config';
import { parseDate } from '~/shared/lib';

export const Patient = ({
    id,
    name,
    birthday,
    gender,
}: sharedConfigTypes.Patient) => {
    const navigate = useNavigate();

    const onClick = () => {
        navigate(`/patient/${id}`);
    };

    return (
        <div
            onClick={onClick}
            className="flex flex-col bg-primary-lightGray rounded-custom gap-1.5 p-5 pt-3 pb-4 cursor-pointer focus:scale-75"
        >
            <p className="font-bold m-0 line-clamp-1 text-md w-fit">{name}</p>
            <div className="flex flex-col">
                <p className="text-primary-superLightGray text-sm leading-none w-fit">
                    Пол –{' '}
                    <span className="text-black">
                        {gender === 'Male' ? 'Мужчина' : 'Женщина'}
                    </span>
                </p>
                <p className="text-primary-superLightGray text-sm leading-none w-fit">
                    Дата рождения –{' '}
                    <span className="text-black">
                        {parseDate.withoutTime(birthday)}
                    </span>
                </p>
            </div>
        </div>
    );
};
