import { FC, useMemo } from 'react';

type EllipseProps = {
    label: string;
    length?: number;
};

const Ellipse: FC<EllipseProps> = ({ label, length = 30 }) => {
    const ellipseContent = useMemo(() => {
        if (label.length > length) {
            return `${label.slice(0, length)}...`;
        }
        return label;
    }, [label, length]);

    return <span>{ellipseContent}</span>;
};

export default Ellipse;
