import { type FormEventHandler, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { schema } from './schema';

import { sharedConfigTypes } from '~/shared/config';

const paramKeys = [
    'start',
    'end',
    'name',
    'conclusions',
    'sorting',
    'scheduledVisits',
    'onlyMine',
    'icdRoots',
    'size',
    'grouped',
    'page',
];

type Params = sharedConfigTypes.Params;

const getParams = (): Params => {
    const urlParams = new URLSearchParams(window.location.search);
    const params = {};

    for (const key of paramKeys) {
        const value = ['conclusions', 'icdRoots'].includes(key)
            ? urlParams.getAll(key) || null
            : urlParams.get(key) || null;

        if (
            value !== null &&
            (Array.isArray(value) ? value.length > 0 : value.trim() !== '')
        ) {
            params[key] = value;
        }
    }

    return params;
};

type FiltersResults = {
    params: Params;
    onSubmit: FormEventHandler<HTMLFormElement>;
};

export const useFilters = (): FiltersResults => {
    const [params, setParams] = useState<Params>(getParams());
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = getParams();
        setParams(params);
    }, [location]);

    const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = schema.safeParse(Object.fromEntries(formData));

        const { page, ...restParams } = params;

        if (
            data.success &&
            JSON.stringify(data.data) !== JSON.stringify(restParams)
        ) {
            const { data: params } = data;
            setParams(params);

            const urlParams = new URLSearchParams();

            for (const key in params) {
                const param = params[key];

                if (['end', 'start'].includes(key)) {
                    continue;
                }

                Array.isArray(param)
                    ? param.forEach((value) => urlParams.append(key, value))
                    : urlParams.append(key, param);
            }

            const urlString = urlParams.toString();
            navigate(`${location.pathname}?${urlString}`, { replace: true });
        }
    };

    return { params, onSubmit };
};
