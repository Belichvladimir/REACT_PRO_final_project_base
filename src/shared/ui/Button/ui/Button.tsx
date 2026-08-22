import { FC, ButtonHTMLAttributes, CSSProperties } from 'react';
import s from './Button.module.css';
import classNames from 'classnames';

export type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'text';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  sx?: CSSProperties;
}

export const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth,
  sx,
  className,
  disabled,
  type = 'button',
  ...rest
}) => {
  return (
    <button
      className={classNames(
        s['button'],
        s[`button_${variant}`],
        fullWidth && s['button_fullwidth'],
        className
      )}
      disabled={disabled}
      type={type}
      style={sx}
      {...rest}
    >
      {children}
    </button>
  );
};
