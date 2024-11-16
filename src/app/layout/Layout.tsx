import React, { PropsWithChildren } from 'react';

import { widgetNavbarUi } from '~/widgets/navbar';
const { Navbar } = widgetNavbarUi;

export const Layout = ({ children }: PropsWithChildren) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex items-center justify-center flex-grow">
                {children}
            </div>
        </div>
    );
};
