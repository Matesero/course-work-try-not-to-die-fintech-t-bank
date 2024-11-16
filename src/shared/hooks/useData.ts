import { useEffect, useState } from 'react';

type FetchedData<T> = {
    data: T | null;
    isLoading: boolean;
};

type Props<T> = () => Promise<T>;

export const useData = <T>(fetchFunction: Props<T>): FetchedData<T> => {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);

        let ignore = false;

        fetchFunction()
            .then((json) => {
                if (!ignore) {
                    console.log(json);
                    setData(json);
                }
            })
            .finally(() => {
                setLoading(false);
            });

        return () => {
            ignore = true;
        };
    }, [fetchFunction]);

    return { data, isLoading };
};
