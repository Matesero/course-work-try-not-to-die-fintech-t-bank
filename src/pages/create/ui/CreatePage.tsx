import React from 'react';

import { Layout } from '~/app/layout';
import { createFeature } from '~/features';

const { CreateForm } = createFeature.ui;

export const CreatePage = () => {
    return (
        <Layout>
            <div className="absolute top-28 w-11/12 2xl:max-w-screen-2xl">
                <h1 className="text-5xl font-bold ml-2 mb-6 pr-3 pl-3">
                    Создание осмотра
                </h1>
                <CreateForm />
            </div>
        </Layout>
    );
};
