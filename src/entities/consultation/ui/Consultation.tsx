import React from 'react';

import { Comment } from '~/features/commenting/ui/Comment';
import { getOne } from '~/shared/api/medicalSystem/consultation';
import { sharedConfigTypes } from '~/shared/config';
import { useData } from '~/shared/hooks/useData';
import { Loading, Wrapper } from '~/shared/ui/components';

type Props = sharedConfigTypes.Consultations[0];

export const Consultation = ({ id, speciality, rootComment }: Props) => {
    const { data, isLoading } = useData<
        sharedConfigTypes.ConsultationFull,
        string
    >(getOne, id);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Wrapper label="Консультация">
            <div className="flex flex-col">
                <p className="text-md font-semibold mt-1 leading-none w-fit">
                    Консультант: <span>{rootComment.author.name}</span>
                </p>
                <p className="text-primary-superLightGray text-sm leading-none w-fit">
                    Специализация консультанта: <span>{speciality.name}</span>
                </p>
            </div>
            {data && (
                <div className="mt-3 w-fit max-w-full">
                    <p className="text-md font-semibold">Комментарии</p>
                    <Comment {...data.comments[0]} comments={data.comments} />
                </div>
            )}
        </Wrapper>
    );
};
