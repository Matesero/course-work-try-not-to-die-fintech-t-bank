import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Layout } from '~/app/layout';
import { Consultation } from '~/entities/consultation/ui';
import { useForm } from '~/features/authorization/model';
import { EditForm } from '~/pages/inspection/ui/EditForm';
import { getIcdRoots } from '~/shared/api/medicalSystem/dictionary';
import { sharedConfigRouter } from '~/shared/config';
import { useStore } from '~/shared/hooks/useStore';
import { parseDate } from '~/shared/lib';
import { englishToRussian } from '~/shared/lib/englishToRussian';
import { userSlice, dictionarySlice } from '~/shared/store';
import { sharedUiComponents } from '~/shared/ui';
import { Wrapper } from '~/shared/ui/components';

const { RouteName } = sharedConfigRouter;
const userSelectors = userSlice.selectors;
const dictionarySelectors = dictionarySlice.selectors;
const { Loading, Button } = sharedUiComponents;

export const InspectionPage = () => {
    const { inspectionData, isLoadingStore } = useStore();
    const [, onSubmit] = useForm('registerPatient');
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();
    const isAuth = useSelector(userSelectors.isAuth);
    const icdRoots = useSelector(dictionarySelectors.icdRoots);

    const appDispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            if (!isAuth) {
                navigate(RouteName.LOGIN_PAGE);
                return;
            }

            if (!icdRoots.length) {
                await appDispatch(getIcdRoots());
            }
        };

        fetchData();
    }, []);

    if (isLoadingStore || !inspectionData) {
        return (
            <Layout>
                <Loading />
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="absolute flex flex-col top-28 w-11/12 2xl:max-w-screen-2xl gap-3">
                <div className="flex flex-col rounded-custom bg-primary-lightGray p-5 gap-5">
                    <div className="flex flex-row justify-between items-center">
                        <p className="text-primary-darkSea font-bold text-4xl leading-0 mt-2">{`Амбулаторный осмотр от ${parseDate.withTime(inspectionData.date)}`}</p>
                        <Button
                            text="Редактировать осмотр"
                            className="!w-fit px-4 py-1.5"
                            onClick={() => setIsEditing(true)}
                        />
                    </div>
                    {isEditing && (
                        <EditForm
                            {...inspectionData}
                            setIsEditing={setIsEditing}
                            onSubmit={onSubmit}
                        />
                    )}
                    <div className="flex flex-col gap-1">
                        <p className="text-sm font-semibold leading-none w-fit">
                            Пациент: <span>{inspectionData.patient.name}</span>
                        </p>
                        <p className="text-sm leading-none w-fit">
                            Пол:{' '}
                            <span>
                                {englishToRussian(
                                    inspectionData.patient.gender,
                                )}
                            </span>
                        </p>
                        <p className="text-sm leading-none w-fit">
                            Дата рождения:{' '}
                            <span>
                                {parseDate.withoutTime(
                                    inspectionData.patient.birthday,
                                )}
                            </span>
                        </p>
                        <p className="text-primary-superLightGray text-sm mt-2 leading-none w-fit">
                            Медицинский работник:{' '}
                            <span>{inspectionData.doctor.name}</span>
                        </p>
                    </div>
                </div>
                <Wrapper label="Жалобы">
                    <span className="text-sm leading-none w-fit">
                        {inspectionData.complaints}
                    </span>
                </Wrapper>
                <Wrapper label="Анамнез заболевания">
                    <span className="text-sm leading-none w-fit">
                        {inspectionData.anamnesis}
                    </span>
                </Wrapper>
                {inspectionData.consultations.map((consultation) => (
                    <Consultation {...consultation} key={consultation.id} />
                ))}
                <Wrapper label="Диагнозы">
                    {inspectionData.diagnoses.map((diagnosis) => (
                        <div key={diagnosis.id}>
                            <p className="text-md font-semibold">{`(${diagnosis.code}) ${diagnosis.name}`}</p>
                            <div className="flex flex-col mt-1">
                                <p className="text-primary-superLightGray text-sm leading-none w-fit">
                                    Тип:{' '}
                                    <span>
                                        {englishToRussian(diagnosis.type)}
                                    </span>
                                </p>
                                <p className="text-primary-superLightGray text-sm leading-none w-fit">
                                    Расшифровка:{' '}
                                    <span>{diagnosis.description}</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </Wrapper>
                <Wrapper label="Рекомендации по лечению">
                    <span className="text-sm leading-none w-fit">
                        {inspectionData.treatment}
                    </span>
                </Wrapper>
                <Wrapper label="Заключение">
                    <p className="text-md font-semibold mt-1 leading-none w-fit">
                        {englishToRussian(inspectionData.conclusion)}
                    </p>
                    {inspectionData.conclusion === 'Disease' && (
                        <p className="text-sm leading-none w-fit">
                            Дата и время следующего визита:{' '}
                            <span>
                                {parseDate.withTime(
                                    inspectionData.nextVisitDate,
                                )}
                            </span>
                        </p>
                    )}
                    {inspectionData.conclusion === 'Death' && (
                        <p className="text-sm leading-none w-fit">
                            Дата и время смерти:{' '}
                            <span>
                                {parseDate.withTime(inspectionData.deathDate)}
                            </span>
                        </p>
                    )}
                </Wrapper>
            </div>
        </Layout>
    );
};
