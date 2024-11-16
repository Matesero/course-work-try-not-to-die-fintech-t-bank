import { medicalSystemApi } from '~/shared/api';
import { cookieService } from '~/shared/store';

const { base } = medicalSystemApi;

type GetParams = {
    id: string;
};

export const getChain = async ({ id }: GetParams) => {
    const response = await base.medicalSystemRequester.get(
        `/inspection/${id}/chain`,
        {
            headers: {
                Authorization: `Bearer ${cookieService.getToken()}`,
            },
        },
    );

    console.log(response.data);

    return response.data;
};
