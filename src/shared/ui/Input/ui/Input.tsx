import { FC, forwardRef, memo, useMemo } from 'react';
import s from './Input.module.css';
import classNames from 'classnames';

export interface InputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
	label?: string;
	error?: string;
	fullWidth?: boolean;
}

const InputComponent = memo(
	forwardRef<HTMLInputElement, InputProps>(
		({ label, error, fullWidth, className, type = 'text', id, ...rest }, ref) => {
			const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

			const computedClassName = useMemo(
				() =>
					classNames(
						s['input'],
						error && s['input_error'],
						fullWidth && s['input_fullwidth'],
						className
					),
				[error, fullWidth, className]
			);

			const style = fullWidth ? { width: '100%' } : undefined;

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
						className={computedClassName}
						aria-invalid={!!error}
						style={style}
						{...rest}
					/>
					{error && <span className={s['input-error']}>{error}</span>}
				</div>
			);
		}
	)
);

InputComponent.displayName = 'Input';

export const Input: FC<InputProps> = InputComponent;
