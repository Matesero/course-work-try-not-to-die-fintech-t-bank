import React from 'react';

import { BarsIcon } from '~/shared/assets/images';
import { ScullIcon } from '~/shared/assets/images';

type Props = {
    isAuth: boolean;
    userName?: string;
};

export const Navbar = ({ isAuth, userName }: Props) => {

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
                                <a href="#">Пациенты</a>
                                <a href="#">Консультации</a>
                                <a href="#">Отчеты и статистика</a>
                            </div>
                        )}
                    </div>
                    <div className="flex gap-6">
                        <div className="hidden xs:flex items-center gap-10">
                            <div className="text-white text-2xl">
                                {!isAuth ? (
                                    <a href="#">Вход</a>
                                ) : (
                                    <button>{userName}</button>
                                )}
                            </div>
                        </div>
                    </div>
                    {isAuth && (
                        <div className="lg:hidden flex items-center">
                            {/** Пока что как заглушка, потом заменить на button */}
                            <a href="#" >
                                <BarsIcon className="h-6" />
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};
