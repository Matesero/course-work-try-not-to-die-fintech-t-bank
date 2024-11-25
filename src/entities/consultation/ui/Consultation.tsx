import * as Sentry from '@sentry/react';
import React, { useEffect, useState } from 'react';

import { commentingFeature } from '~/features';
import { medicalSystemApi } from '~/shared/api';
import { sharedConfigTypes } from '~/shared/config';
import { useData } from '~/shared/hooks/useData';
import { sharedUiComponents } from '~/shared/ui';

const { Comment } = commentingFeature.ui;
const { getOne } = medicalSystemApi.consultation;
const { Loading, Wrapper } = sharedUiComponents;

type Props = sharedConfigTypes.Consultations[0];

export const Consultation = ({ id, speciality, rootComment }: Props) => {
    const { data, isLoading } = useData<
        sharedConfigTypes.ConsultationFull,
        string
    >(getOne, id);
    const [comments, setComments] = useState<sharedConfigTypes.Comment[]>(
        data?.comments || [],
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getOne(id);

                if (
                    JSON.stringify(response.data.comments) !==
                    JSON.stringify(comments)
                ) {
                    setComments(response.data.comments);
                }
            } catch (error) {
                Sentry.captureException(error);
            }
        };

        const intervalId = setInterval(fetchData, 2000);

        return () => {
            clearInterval(intervalId);
        };
    }, [comments, id]);

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
                    <Comment
                        {...comments[0]}
                        consultationId={id}
                        comments={comments}
                    />
                </div>
            )}
        </Wrapper>
    );
};
