import { useState, ChangeEvent } from 'react';
import classNames from 'classnames';
import s from './ReviewForm.module.css';
import { Rating } from '../../../../shared/ui/Rating';
import { Textarea } from '../../../../shared/ui/Textarea';
import { Button } from '../../../../shared/ui/Button';

export const ReviewForm = () => {
	const [reviewText, setReviewText] = useState('');
	const [rating, setRating] = useState(0);

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setReviewText(e.target.value);
	};

	const handleClick = () => {
		console.log('Отправка: ', { reviewText, rating });
	};

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
};
