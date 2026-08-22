import { FC, forwardRef } from 'react';
import s from './Textarea.module.css';
import classNames from 'classnames';

export interface TextareaProps
	extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'rows'> {
	label?: string;
	error?: string;
}

export const Textarea: FC<TextareaProps> = forwardRef<
	HTMLTextAreaElement,
	TextareaProps
>(({ label, error, className, id, ...rest }, ref) => {
	const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');

	return (
		<div className={s['textarea-wrapper']}>
			{label && (
				<label htmlFor={textareaId} className={s['textarea-label']}>
					{label}
				</label>
			)}
			<textarea
				ref={ref}
				id={textareaId}
				className={classNames(
					s['textarea'],
					error && s['textarea_error'],
					className
				)}
				aria-invalid={!!error}
				{...rest}
			/>
			{error && <span className={s['textarea-error']}>{error}</span>}
		</div>
	);
});

Textarea.displayName = 'Textarea';
