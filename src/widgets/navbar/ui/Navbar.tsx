import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getProfile } from '~/shared/api/medicalSystem/user';
import { BarsIcon } from '~/shared/assets/images';
import ScullIcon from '~/shared/assets/images/scull.svg?url';
import { sharedConfigRouter } from '~/shared/config';
import { useAppDispatch, userSlice } from '~/shared/store';
import { checkToken } from '~/shared/store/cookie';
import { Loading } from '~/shared/ui/components';

const { selectors } = userSlice;
const { RouteName } = sharedConfigRouter;

export const Navbar = () => {
    const user = useSelector(selectors.user);
    const addDispatch = useAppDispatch();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            await addDispatch(getProfile());
        };

        if (!user && checkToken()) {
            fetch();
        }
    }, [user]);

    const handleLoginClick = () => navigate({ pathname: RouteName.LOGIN_PAGE });
    const handlePatientsClick = () =>
        navigate({ pathname: RouteName.PATIENTS_PAGE });
    const handleConsultationsClick = () =>
        navigate({ pathname: RouteName.CONSULTATIONS_PAGE });
    const handleReportsClick = () =>
        navigate({ pathname: RouteName.REPORTS_PAGE });

    const handleProfileClick = () =>
        navigate({ pathname: RouteName.PROFILE_PAGE });
    const handleLogoutClick = () => {
        addDispatch(userSlice.store.logout());
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target) &&
                isSidebarOpen
            ) {
                setIsSidebarOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSidebarOpen]);

    return (
        <nav>
            <div className="mx-auto bg-primary-darkSea">
                <div className="flex mx-auto justify-between w-11/12">
                    <div className="flex items-center gap-16 my-4">
                        <div className="flex gap-10 items-center">
                            <img
                                src={ScullIcon}
                                className="h-16 w-16"
                                alt="scullIcon"
                            />
                            <span className="text-white text-2xl">
                                Try not to
                                <span className="block text-right text-3xl font-bold">
                                    DIE
                                </span>
                            </span>
                        </div>
                        {user && (
                            <div className="hidden lg:flex gap-8 text-white text-lg">
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
                                <a
                                    onClick={handleReportsClick}
                                    className="cursor-pointer"
                                >
                                    Отчеты и статистика
                                </a>
                            </div>
                        )}
                    </div>
                    <div className="flex gap-6">
                        <div className="hidden xs:flex items-center gap-10">
                            <div className="text-white text-2xl">
                                {!user ? (
                                    <a
                                        onClick={handleLoginClick}
                                        className="cursor-pointer"
                                    >
                                        Вход
                                    </a>
                                ) : (
                                    <div className="relative hidden lg:block">
                                        {!user ? (
                                            <Loading />
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() =>
                                                        setIsDropdownOpen(
                                                            !isDropdownOpen,
                                                        )
                                                    }
                                                    className="text-white"
                                                >
                                                    {user?.name}
                                                </button>
                                                {isDropdownOpen && (
                                                    <div className="absolute right-0 mt-2 bg-white text-black rounded-lg shadow-lg z-20 w-40">
                                                        <button
                                                            onClick={
                                                                handleProfileClick
                                                            }
                                                            className="block px-4 py-2 w-full text-left"
                                                        >
                                                            Профиль
                                                        </button>
                                                        <button
                                                            onClick={
                                                                handleLogoutClick
                                                            }
                                                            className="block px-4 py-2 w-full text-left"
                                                        >
                                                            Выход
                                                        </button>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {isSidebarOpen && (
                        <div
                            ref={sidebarRef}
                            className="fixed lg:hidden top-0 right-0 h-screen w-56 bg-white bg-opacity-90 backdrop-blur-md shadow-lg z-50 flex flex-col"
                        >
                            <button
                                onClick={() => setIsSidebarOpen(false)}
                                className="p-8 pb-2 self-end"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="40"
                                    viewBox="0 96 960 960"
                                    width="40"
                                    fill="black"
                                >
                                    <path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" />
                                </svg>
                            </button>
                            <ul className="flex flex-col w-full mt-4">
                                <li>
                                    <a
                                        onClick={handleProfileClick}
                                        className="block w-full px-6 py-3 text-black hover:bg-gray-200 cursor-pointer"
                                    >
                                        Профиль
                                    </a>
                                </li>
                                <li>
                                    <a
                                        onClick={handlePatientsClick}
                                        className="block w-full px-6 py-3 text-black hover:bg-gray-200 cursor-pointer"
                                    >
                                        Пациенты
                                    </a>
                                </li>
                                <li>
                                    <a
                                        onClick={handleConsultationsClick}
                                        className="block w-full px-6 py-3 text-black hover:bg-gray-200 cursor-pointer"
                                    >
                                        Консультации
                                    </a>
                                </li>
                                <li>
                                    <a
                                        onClick={handleReportsClick}
                                        className="block w-full px-6 py-3 text-black hover:bg-gray-200 cursor-pointer"
                                    >
                                        Статистика
                                    </a>
                                </li>
                                <li>
                                    <a
                                        onClick={handleLogoutClick}
                                        className="block w-full px-6 py-3 text-black hover:bg-gray-200 cursor-pointer"
                                    >
                                        Выход
                                    </a>
                                </li>
                            </ul>
                        </div>
                    )}

                    {user && (
                        <div className="lg:hidden flex items-center">
                            <button
                                onClick={() =>
                                    setIsSidebarOpen((prevState) => !prevState)
                                }
                            >
                                <BarsIcon className="h-6" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};
