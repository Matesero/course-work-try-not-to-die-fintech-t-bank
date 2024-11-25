import React from 'react';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

export const RootBoundary = () => {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        switch (error.status) {
            case 404:
                return <div>Эта страница не существует</div>;
            case 401:
                return <div>Вы не авторизованы</div>;
            default:
                return <div>Что-то пошло не так</div>;
        }
    }

    return <div>Что-то пошло не так</div>;
};
