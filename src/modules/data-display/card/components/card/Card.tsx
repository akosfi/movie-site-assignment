import { FC, ReactElement } from 'react';
import classNames from 'classnames';

import css from './Card.module.scss';

type CardProps = {
    children: ReactElement | ReactElement[];
    className?: string;
};

const Card: FC<CardProps> = ({ children, className }) => (
    <div className={classNames(css['card'], className)}>{children}</div>
);

export default Card;
