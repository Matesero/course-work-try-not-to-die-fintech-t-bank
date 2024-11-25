type Props = {
    error: string | null;
};

export const Error = ({ error }: Props) => {
    return error ? (
        <p className="text-sm lg:text-md text-red-600 font-medium leading-0">
            {error}
        </p>
    ) : null;
};
