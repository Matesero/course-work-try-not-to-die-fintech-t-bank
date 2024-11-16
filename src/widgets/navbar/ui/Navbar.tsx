import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { BarsIcon } from '~/shared/assets/images';
import { ScullIcon } from '~/shared/assets/images';
import { sharedConfigRouter } from '~/shared/config';
import { userSlice } from '~/shared/store';
const { selectors } = userSlice;

const { RouteName } = sharedConfigRouter;

export const Navbar = () => {
    const isAuth = useSelector(selectors.isAuth);
    const user = useSelector(selectors.user);

    const navigate = useNavigate();
    const handleLoginClick = () => navigate({ pathname: RouteName.LOGIN_PAGE });
    const handlePatientsClick = () =>
        navigate({ pathname: RouteName.PATIENTS_PAGE });
    const handleConsultationsClick = () =>
        navigate({ pathname: RouteName.CONSULTATIONS_PAGE });

    return (
        <nav>
            <div className="mx-auto bg-primary-darkSea">
                <div className="flex mx-auto justify-between w-11/12">
                    <div className="flex items-center gap-16 my-4">
                        <div className="flex gap-10 items-center">
                            <ScullIcon className="h-16 w-16" />
                            <span className="text-white text-2xl">
                                Try not to
                                <span className="block text-right text-3xl font-bold">
                                    DIE
                                </span>
                            </span>
                        </div>
                        {isAuth && (
                            <div className="hidden lg:flex gap-8 text-white">
                                <a
                                    onClick={handlePatientsClick}
                                    className="cursor-pointer"
                                >
                                    Пациенты
                                </a>
                                <a
                                    onClick={handleConsultationsClick}
                                    className="cursor-pointer"
                                >
                                    Консультации
                                </a>
                                <a href={RouteName.REPORTS_PAGE}>
                                    Отчеты и статистика
                                </a>
                            </div>
                        )}
                    </div>
                    <div className="flex gap-6">
                        <div className="hidden xs:flex items-center gap-10">
                            <div className="text-white text-2xl">
                                {!isAuth ? (
                                    <a
                                        onClick={handleLoginClick}
                                        className="cursor-pointer"
                                    >
                                        Вход
                                    </a>
                                ) : (
                                    <button>{user?.name}</button>
                                )}
                            </div>
                        </div>
                    </div>
                    {isAuth && (
                        <div className="lg:hidden flex items-center">
                            {/** Пока что как заглушка, потом заменить на button */}
                            <a href="#">
                                <BarsIcon className="h-6" />
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};
