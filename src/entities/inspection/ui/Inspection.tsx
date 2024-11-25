import * as Sentry from '@sentry/react';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { parseDiagnosis } from '../model';
import { Button } from './Button';

import { medicalSystemApi } from '~/shared/api';
import { MinusIcon, PlusIcon } from '~/shared/assets/images';
import { sharedConfigTypes } from '~/shared/config';
import { useGrid } from '~/shared/hooks/useGrid';
import { parseDate } from '~/shared/lib';
import { englishToRussian } from '~/shared/lib/englishToRussian';
import { setPrevInspection } from '~/shared/store/inspection/store';
import { useAppDispatch } from '~/shared/store/store';

const { inspection } = medicalSystemApi;
type ConsultationType = sharedConfigTypes.Consultation;

type Props = ConsultationType & {
    nesteds?: ConsultationType[];
    className?: string;
    isGrouped?: boolean;
    isDeath?: boolean;
    isConsultation?: boolean;
    previousHasChain?: boolean;
};

export const Inspection = ({
    id,
    date,
    conclusion,
    diagnosis,
    doctor,
    hasChain,
    previousHasChain,
    hasNested,
    isGrouped,
    className,
    patientId,
    isConsultation,
    nesteds,
    isDeath,
}: Props) => {
    const appDispatch = useAppDispatch();
    const navigate = useNavigate();
    const consultationRef = useRef<HTMLDivElement | null>(null);
    const [chains, setChains] = useState<ConsultationType[] | null>(
        nesteds ?? null,
    );
    const [isOpen, setIsOpen] = useState<boolean>(false);
    useGrid(consultationRef, isOpen);

    const toggleVisibility = () => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
    };

    const onAddClick = () => {
        appDispatch(setPrevInspection(id));
        navigate(`/inspection/create/${patientId}`);
    };

    const onDetailsClick = () => {
        navigate(`/inspection/${id}`);
    };

    useEffect(() => {
        if (!chains && hasChain && isGrouped) {
            const fetchChains = async () => {
                try {
                    const response = await inspection.getChain({ id });
                    setChains(response.data);
                } catch (error) {
                    Sentry.captureException(error);
                }
            };

            fetchChains();
        }
    }, [chains, hasChain, id, isGrouped]);

    return (
        <div className="item h-fit">
            <div
                className={`${className || 'content'} flex flex-col gap-1.5 ml-auto`}
            >
                <div
                    ref={consultationRef}
                    className={`flex h-fit flex-col ${conclusion === 'Death' ? 'bg-primary-fairPink' : 'bg-primary-lightGray'} rounded-custom gap-1 p-5 pt-3 pb-4 cursor-default content`}
                >
                    <div className="flex flex-row justify-between h-fit">
                        <div className="bg-none font-bold flex flex-row gap-1 mt-1.5">
                            {isGrouped && hasNested && (
                                <div
                                    className="icon-container"
                                    onClick={toggleVisibility}
                                >
                                    {isOpen ? (
                                        <MinusIcon className="bg-primary-tuftsBlue rounded-custom w-6 h-6 cursor-pointer" />
                                    ) : (
                                        <PlusIcon className="bg-primary-tuftsBlue rounded-custom w-6 h-6 cursor-pointer" />
                                    )}
                                </div>
                            )}
                            <span className="bg-primary-romanSilver h-fit text-white rounded-custom text-sm font-semibold p-0.5 pl-1.5 pr-1.5">
                                {parseDate.withoutTime(date)}
                            </span>
                            <span className="ml-1">Амбулаторный осмотр</span>
                        </div>
                        <div className="flex text-sm gap-6 lg:gap-2 flex-row xl:gap-6">
                            {!hasNested &&
                                conclusion !== 'Death' &&
                                !isConsultation &&
                                !isDeath && (
                                    <Button
                                        label="Добавить осмотр"
                                        onClick={onAddClick}
                                    />
                                )}
                            <Button
                                label="Детали осмотра"
                                onClick={onDetailsClick}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col mt-3 gap-1">
                        <p className="text-sm leading-none w-fit">
                            Заключение:{' '}
                            <span>
                                {englishToRussian(conclusion).toLowerCase()}
                            </span>
                        </p>
                        <p className="text-sm leading-none w-fit">
                            Основной диагноз:{' '}
                            <span>{parseDiagnosis(diagnosis)}</span>
                        </p>
                        <p className="text-primary-superLightGray text-sm mt-2 leading-none w-fit">
                            Медицинский работник: <span>{doctor}</span>
                        </p>
                    </div>
                </div>
                {isGrouped && isOpen && chains?.length && (
                    <Inspection
                        key={chains?.[0]?.id || 'default-id'}
                        {...chains?.[0]}
                        previousHasChain={hasChain}
                        isGrouped
                        nesteds={chains?.slice(1)}
                        isConsultation
                        className={previousHasChain || hasChain ? '!pl-10' : ''}
                    />
                )}
            </div>
        </div>
    );
};
