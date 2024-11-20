import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { medicalSystemApi } from '~/shared/api';
import { getCard } from '~/shared/api/medicalSystem/patient';
import { getProfile } from '~/shared/api/medicalSystem/user';
import { sharedConfigTypes } from '~/shared/config';
import { sharedConfigRouter } from '~/shared/config';
import { patientSlice, inspectionSlice, useAppDispatch } from '~/shared/store';
import { setCurInspection } from '~/shared/store/inspection/store';
import { removePatient, setId } from '~/shared/store/patient/store';
const patientSelectors = patientSlice.selectors;
const inspectionSelectors = inspectionSlice.selectors;
const { RouteName } = sharedConfigRouter;
type PatientType = sharedConfigTypes.Patient;
type InspectionType = sharedConfigTypes.Inspection;
import { isLoading as isLoadingSelector } from '~/shared/store/selectors';
const { inspection } = medicalSystemApi;

export const useStore = () => {
    const appDispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const patientData: PatientType = useSelector(patientSelectors.data);
    const inspectionData: InspectionType = useSelector(
        inspectionSelectors.data,
    );
    const isLoading = useSelector(isLoadingSelector);

    useEffect(() => {
        const fetchPatient = async () => {
            if (id) {
                try {
                    appDispatch(setId(id));
                    await appDispatch(getCard(id));
                } catch (e) {
                    navigate(RouteName.PATIENTS_PAGE);
                }
            } else {
                if (!location.pathname.includes('/create')) {
                    navigate(-1);
                }
            }
        };

        const fetchInspection = async () => {
            if (id) {
                try {
                    appDispatch(setCurInspection(id));
                    await appDispatch(inspection.get(id));
                    await appDispatch(getProfile());
                } catch (e) {
                    console.log(e);
                }
            }
        };

        if (location.pathname.includes('/patient/')) {
            fetchPatient();
        } else {
            if (patientData && !location.pathname.includes('/create')) {
                appDispatch(removePatient());
            }
        }

        if (location.pathname.includes('/inspection/')) {
            fetchInspection();
        } else {
            if (inspectionData) {
                appDispatch(inspectionSlice.store.removeData());
            }
        }
    }, [location]);

    return { patientData, inspectionData, isLoadingStore: isLoading };
};
