import { useNavigate } from 'react-router-dom';

type Props = {
    label: string;
    imgLink?: string;
    navigateUrl?: string;
};

export const Button = ({ label, imgLink, navigateUrl }: Props) => {
    const navigate = useNavigate();

    const onClick = () => {
        if (navigateUrl) {
            navigate(navigateUrl);
        }
    };

    return (
        <button
            className="bg-none text-primary-tuftsBlue font-semibold"
            onClick={navigateUrl ? onClick : undefined}
        >
            {imgLink && (
                <img src={imgLink} alt={label} className="inline-block mr-2" />
            )}
            {label}
        </button>
    );
};
