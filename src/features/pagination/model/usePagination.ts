import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const getInitialPage = (): number => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get('page');
    return pageParam ? parseInt(pageParam) : 1;
};

type Props = number | undefined;

type PaginationResult = {
    currentPage: number;
    startPage: number;
    endPage: number;
    onChangePage: (page: number) => void;
};

export const usePagination = (total: Props): PaginationResult => {
    const [currentPage, setCurrentPage] = useState<number>(getInitialPage());
    const [startPage, setStartPage] = useState<number>(1);
    const [endPage, setEndPage] = useState<number>(1);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setCurrentPage(getInitialPage());
    }, [location]);

    useEffect(() => {
        if (!total) {
            return;
        }

        const maxVisibleButtons = 7;
        const halfRange = Math.floor(maxVisibleButtons / 2);

        let start = Math.max(currentPage - halfRange, 1);
        let end = Math.min(currentPage + halfRange, total);

        if (end - start + 1 < maxVisibleButtons) {
            if (start === 1) {
                end = Math.min(start + maxVisibleButtons - 1, total);
            } else if (end === total) {
                start = Math.max(end - maxVisibleButtons + 1, 1);
            }
        }

        setStartPage(start);
        setEndPage(end);
    }, [currentPage, total]);

    const onChangePage = (page: number) => {
        setCurrentPage(page);
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('page', page.toString());
        navigate(`?${searchParams.toString()}`, { replace: true });
    };

    return { currentPage, startPage, endPage, onChangePage };
};
