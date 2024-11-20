import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { sharedConfigTypes } from '~/shared/config';
import { parseDate } from '~/shared/lib';
import { userSlice } from '~/shared/store';
import { Button, Textarea } from '~/shared/ui/components';

const userSelectors = userSlice.selectors;

type Props = sharedConfigTypes.Comment & {
    comments: sharedConfigTypes.Comment[];
};

export const Comment = ({
    id,
    content,
    author,
    authorId,
    createTime,
    modifiedDate,
    comments,
}: Props) => {
    const user = useSelector(userSelectors.user);
    const [childIsOpen, setChildIsOpen] = useState(false);
    const [inputIsOpen, setInputIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const editRef = useRef<HTMLTextAreaElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const childComments = comments.filter((comment) => comment.parentId === id);

    const toggleChildVisibility = () => {
        setChildIsOpen((prevIsOpen) => !prevIsOpen);
    };

    const toggleOpenVisibility = () => {
        setIsEditing(false);
        setInputIsOpen(true);
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };

    const toggleIsEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            editRef.current?.focus();
        }, 0);
    };

    return (
        <div className="h-fit w-full flex flex-col ps-5">
            <div className="flex flex-col gap-1 border-b-2 border-gray-300 pb-1 mb-2">
                <p className="font-semibold text-sm">
                    {author}{' '}
                    <span className="font-medium">
                        {authorId === user?.id ? '(Вы)' : ''}
                    </span>
                </p>
                {!isEditing ? (
                    <p className="ms-2">
                        {content}
                        <span>{modifiedDate !== createTime ?? 'ред'}</span>
                    </p>
                ) : (
                    <div className="flex flex-row items-center gap-3">
                        <Textarea
                            name="edit"
                            ref={editRef}
                            defaultValue={content}
                            className="!w-96 !py-1"
                            placeholder="Введите текст комментария"
                            rows={1}
                            textSize="md"
                        />
                        <Button
                            text="Сохранить"
                            className="!w-fit py-1"
                            bgColor="primary-orange"
                            textSize="md"
                        />
                        <Button
                            text="Отмена"
                            className="!w-fit py-1"
                            bgColor="primary-gray"
                            textSize="md"
                            onClick={() =>
                                setIsEditing((preIsEditing) => !preIsEditing)
                            }
                        />
                    </div>
                )}
                <div className="flex flex-row gap-2 items-center">
                    <span className="text-primary-superLightGray text-sm">
                        {parseDate.withTime(modifiedDate)}
                    </span>
                    {childComments.length > 0 && (
                        <button
                            onClick={toggleChildVisibility}
                            className="text-primary-tuftsBlue text-sm"
                        >
                            {childIsOpen
                                ? 'Скрыть ответы'
                                : `Показать ответы (${childComments.length})`}
                        </button>
                    )}
                    <button
                        className="text-primary-tuftsBlue text-sm"
                        onClick={toggleOpenVisibility}
                    >
                        Ответить
                    </button>
                    {authorId === user.id && (
                        <button
                            className="text-primary-tuftsBlue text-sm"
                            onClick={toggleIsEditing}
                        >
                            Редактировать
                        </button>
                    )}
                </div>
                {inputIsOpen && (
                    <div className="flex flex-row items-center gap-3">
                        <Textarea
                            name="input"
                            ref={inputRef}
                            placeholder="Введите текст комментария"
                            className="!w-96 !py-1"
                            rows={1}
                            textSize="md"
                        />
                        <Button
                            text="Оставить комментарий"
                            className="!w-fit py-1"
                            textSize="md"
                        />
                    </div>
                )}
            </div>

            {childIsOpen && childComments.length > 0 && (
                <div className="ms-4">
                    {childComments.map((comment) => (
                        <Comment
                            key={comment.id}
                            comments={comments}
                            {...comment}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
