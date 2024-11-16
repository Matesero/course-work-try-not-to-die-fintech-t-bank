import React from 'react';
import { ReactNode } from 'react';

import { Navbar } from '~/widgets/navbar/ui';

type Props = {
    children: ReactNode;
    isAuth: boolean;
    userName?: string;
};

export const Layout = ({ children, isAuth, userName }: Props) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar isAuth={isAuth} userName={userName} />
            <div className="flex items-center justify-center flex-grow">
                {children}
            </div>
        </div>
    );
};
