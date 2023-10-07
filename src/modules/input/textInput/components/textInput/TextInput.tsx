import { FC } from 'react';
import classNames from 'classnames';

import css from './TextInput.module.scss';

export enum TextInputSize {
    SMALL = 'small',
    NORMAL = 'normal',
}

type ButtonProps = {
    value: string;
    setValue: (value: string) => void;
    size: TextInputSize;
    className?: string;
    placeHolder?: string;
};

const TextInput: FC<ButtonProps> = ({ size, setValue, value, className, placeHolder = "" }) => (
    <input
        type='text'
        value={value}
        onChange={e => setValue(e.target.value)}
        className={classNames(
            css['textInput'],
            css[`textInput-size-${size}`],
            className,
        )}
        placeholder={placeHolder}
    />
);

export default TextInput;
