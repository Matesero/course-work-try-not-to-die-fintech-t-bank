import { AxiosResponse } from 'axios';
import { useEffect, useState, useCallback } from 'react';

type FetchedData<T> = {
    data: T | null;
    isLoading: boolean;
    refetch: () => void;
};

type FetchFunction<T, P> = (params: P) => Promise<AxiosResponse<T>>;

export const useData = <T, P>(
    fetchFunction: FetchFunction<T, P>,
    params: P,
    lazy = false,
): FetchedData<T> => {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setLoading] = useState<boolean>(!lazy);
    const [prevParams, setPrevParams] = useState<P | null>(null);
    const [isLazyMode, setIsLazyMode] = useState<boolean>(lazy);

    const refetch = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetchFunction(params);
            setData(response.data);
            setPrevParams(params);
            setIsLazyMode(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }, [fetchFunction, params]);

    useEffect(() => {
        if (
            !isLazyMode &&
            JSON.stringify(prevParams) !== JSON.stringify(params)
        ) {
            refetch();
        }
    }, [lazy, params, prevParams, refetch]);

    return { data, isLoading, refetch };
};
