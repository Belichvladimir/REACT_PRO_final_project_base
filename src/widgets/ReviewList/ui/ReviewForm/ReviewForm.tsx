import { useState, ChangeEvent, memo, useCallback } from 'react';
import classNames from 'classnames';
import s from './ReviewForm.module.css';
import { Rating } from '../../../../shared/ui/Rating';
import { Textarea } from '../../../../shared/ui/Textarea';
import { Button } from '../../../../shared/ui/Button';

const ReviewFormComponent = memo(() => {
	const [reviewText, setReviewText] = useState('');
	const [rating, setRating] = useState(0);

	const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
		setReviewText(e.target.value);
	}, []);

	const handleClick = useCallback(() => {
		console.log('Отправка: ', { reviewText, rating });
	}, [reviewText, rating]);

	return (
		<form className={s['form']}>
			<Rating isEdit rating={rating} onChange={setRating} />
			<Textarea
				name='text'
				id='text'
				placeholder='Напишите текст отзыва'
				value={reviewText}
				onChange={handleChange}
			/>
			<Button
				type='submit'
				variant='primary'
				className={classNames(s['form__btn'], s['pramary'])}
				onClick={handleClick}>
				Отправить отзыв
			</Button>
		</form>
	);
});

ReviewFormComponent.displayName = 'ReviewForm';

export const ReviewForm = ReviewFormComponent;
