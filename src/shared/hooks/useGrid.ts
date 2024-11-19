import { useEffect } from 'react';

const resizeGridItem = (item: HTMLElement | null) => {
    if (item && item.querySelector('.content')) {
        const grid = document.getElementsByClassName('grid')[0];
        const rowHeight = parseInt(
            window
                .getComputedStyle(grid)
                .getPropertyValue('grid-template-rows'),
        );
        const rowGap = parseInt(
            window.getComputedStyle(grid).getPropertyValue('gap'),
        );
        const contentElement = item.querySelector('.content');

        if (contentElement) {
            const rowSpan = Math.ceil(
                (contentElement.getBoundingClientRect().height + rowGap) /
                    (rowHeight + rowGap),
            );
            item.style.gridRowEnd = `span ${rowSpan}`;
        }
    }
};

const resizeAllGridItems = () => {
    const allItems = Array.from(
        document.getElementsByClassName('item'),
    ) as HTMLElement[];
    allItems.forEach(resizeGridItem);
};

export const useGrid = (ref: React.RefObject<HTMLElement>, isOpen: boolean) => {
    useEffect(() => {
        if (ref.current) {
            resizeGridItem(ref.current);
        }
        window.addEventListener('resize', resizeAllGridItems);

        return () => {
            window.removeEventListener('resize', resizeAllGridItems);
        };
    }, [ref]);

    useEffect(() => {
        resizeAllGridItems();
    }, [isOpen]);
};
