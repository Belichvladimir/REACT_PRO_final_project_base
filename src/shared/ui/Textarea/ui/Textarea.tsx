import { FC, forwardRef, memo, useMemo } from 'react';
import s from './Textarea.module.css';
import classNames from 'classnames';

export interface TextareaProps
	extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'rows'> {
	label?: string;
	error?: string;
}

const TextareaComponent = memo(
	forwardRef<HTMLTextAreaElement, TextareaProps>(
		({ label, error, className, id, ...rest }, ref) => {
			const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');

			const computedClassName = useMemo(
				() =>
					classNames(
						s['textarea'],
						error && s['textarea_error'],
						className
					),
				[error, className]
			);

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
						className={computedClassName}
						aria-invalid={!!error}
						{...rest}
					/>
					{error && <span className={s['textarea-error']}>{error}</span>}
				</div>
			);
		}
	)
);

TextareaComponent.displayName = 'Textarea';

export const Textarea: FC<TextareaProps> = TextareaComponent;
