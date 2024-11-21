import { Button } from './Button';

type Props = {
    current: number;
    start: number;
    end: number;
    onPageChange: (page: number) => void;
};

export const Pagination = ({ current, start, end, onPageChange }: Props) => {
    return (
        <div className="flex gap-1 mb-5">
            <Button
                key="prev"
                onClick={() => onPageChange(current - 1)}
                page={'<'}
                isDisabled={current === start}
            />

            {[...Array(end - start + 1)].map((_, index) => {
                const page = start + index;
                return (
                    <Button
                        key={page}
                        onClick={() => onPageChange(page)}
                        page={page.toString()}
                        isCurrent={current === page}
                    />
                );
            })}

            <Button
                key="next"
                onClick={() => onPageChange(current + 1)}
                page={'>'}
                isDisabled={current === end}
            />
        </div>
    );
};
