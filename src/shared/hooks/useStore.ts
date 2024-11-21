import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { checkIsDeath } from '~/pages/patient/model/model';
import { medicalSystemApi } from '~/shared/api';
import { sharedConfigTypes } from '~/shared/config';
import { sharedConfigRouter } from '~/shared/config';
import {
    patientSlice,
    inspectionSlice,
    useAppDispatch,
    dictionarySlice,
} from '~/shared/store';

const { setCurInspection } = inspectionSlice.store;
const { setId, setIsDeath } = patientSlice.store;
const patientSelectors = patientSlice.selectors;
const inspectionSelectors = inspectionSlice.selectors;
const dictionarySelectors = dictionarySlice.selectors;
const { getCard, getInspectionsWithoutChild } = medicalSystemApi.patient;
const { getIcdRoots, getSpecialties } = medicalSystemApi.dictionary;
const { inspection } = medicalSystemApi;
const { RouteName } = sharedConfigRouter;

type PatientType = sharedConfigTypes.Patient;
type InspectionType = sharedConfigTypes.Inspection;

type Props = {
    needSpecialties?: boolean;
    needIcdRoots?: boolean;
    needInspectionWithoutChild?: boolean;
    needPatient?: boolean;
};

export const useStore = ({
    needSpecialties,
    needIcdRoots,
    needInspectionWithoutChild,
    needPatient,
}: Props) => {
    const [isLoading, setIsLoading] = useState(true);
    const appDispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const patientData: PatientType = useSelector(patientSelectors.data);
    const inspectionData: InspectionType = useSelector(
        inspectionSelectors.data,
    );
    const specialties = useSelector(dictionarySelectors.specialties);
    const inspectionsWithoutChild = useSelector(
        patientSelectors.inspectionsWithoutChild,
    );
    const icdRoots = useSelector(dictionarySelectors.icdRoots);

    useEffect(() => {
        const fetchPatient = async () => {
            if (!patientData || id !== patientData?.id) {
                appDispatch(patientSlice.store.removePatient());
            } else {
                if (needInspectionWithoutChild) {
                    appDispatch(
                        getInspectionsWithoutChild({ id, request: '' }),
                    );
                }
            }

            if (id) {
                try {
                    appDispatch(setId(id));
                    const response = await appDispatch(getCard(id));
                    if (getCard.rejected.match(response)) {
                        navigate(RouteName.NOT_FOUND_PAGE, { replace: true });
                        return;
                    }
                    if (needInspectionWithoutChild) {
                        appDispatch(
                            getInspectionsWithoutChild({ id, request: '' }),
                        );
                    }
                    const isDeath = await checkIsDeath(id);
                    appDispatch(setIsDeath(isDeath));
                    setIsLoading(false);
                } catch (e) {
                    navigate(RouteName.PATIENTS_PAGE);
                }
            } else {
                if (!location.pathname.includes('/create')) {
                    navigate(-1);
                }
            }
        };

        const fetchSpecialties = () => {
            try {
                appDispatch(getSpecialties({ page: 1, size: 20 }));
            } catch (error) {
                throw new Error(`Ошибка получения специальностей ${error}`);
            }
        };

        const fetchIcdRoots = () => {
            try {
                appDispatch(getIcdRoots());
            } catch (error) {
                throw new Error(`Ошибка корней МКБ-10 ${error}`);
            }
        };

        const fetchInspection = async () => {
            appDispatch(inspectionSlice.store.removeData());
            if (id) {
                try {
                    appDispatch(setCurInspection(id));
                    const response = await appDispatch(inspection.get(id));
                    if (inspection.get.rejected.match(response)) {
                        navigate(RouteName.NOT_FOUND_PAGE, { replace: true });
                        return;
                    }
                } catch (error) {
                    throw new Error(`Ошибка получения осмотра ${error}`);
                }
            }
        };

        if (needPatient) {
            fetchPatient();
        }

        if (needSpecialties && !specialties.length) {
            fetchSpecialties();
        }

        if (needIcdRoots && !icdRoots) {
            fetchIcdRoots();
        }

        if (
            location.pathname.includes('/inspection/') &&
            !location.pathname.includes('create')
        ) {
            fetchInspection();
        } else {
            appDispatch(inspectionSlice.store.removeData());
        }

        return () => {
            appDispatch(patientSlice.store.removePatient());
        };
    }, [location.pathname]);

    return {
        patientData,
        inspectionData,
        isLoadingStore: isLoading,
        specialties,
        inspectionsWithoutChild,
        icdRoots,
    };
};
