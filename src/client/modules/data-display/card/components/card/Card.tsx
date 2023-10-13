import { FC, ReactElement } from 'react';
import classNames from 'classnames';

import css from './Card.module.scss';

type CardProps = {
    children: ReactElement | ReactElement[];
    className?: string;
    testId?: string;
};

const Card: FC<CardProps> = ({ children, className, testId }) => (
    <div className={classNames(css['card'], className)} data-testid={testId}>
        {children}
    </div>
);

export default Card;
