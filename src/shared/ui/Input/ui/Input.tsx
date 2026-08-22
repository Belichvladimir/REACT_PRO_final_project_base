import { FC, forwardRef } from 'react';
import s from './Input.module.css';
import classNames from 'classnames';

export interface InputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
	label?: string;
	error?: string;
	fullWidth?: boolean;
}

export const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
	({ label, error, fullWidth, className, type = 'text', id, ...rest }, ref) => {
		const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

		return (
			<div
				className={s['input-wrapper']}
				style={fullWidth ? { width: '100%' } : undefined}>
				{label && (
					<label htmlFor={inputId} className={s['input-label']}>
						{label}
					</label>
				)}
				<input
					ref={ref}
					id={inputId}
					type={type}
					className={classNames(
						s['input'],
						error && s['input_error'],
						fullWidth && s['input_fullwidth'],
						className
					)}
					aria-invalid={!!error}
					style={fullWidth ? { width: '100%' } : undefined}
					{...rest}
				/>
				{error && <span className={s['input-error']}>{error}</span>}
			</div>
		);
	}
);

Input.displayName = 'Input';
