import { ReactComponent as Star } from '../../../assets/icons/star.svg';
import { memo } from 'react';

type TRating = {
	rating?: number;
	isEdit?: boolean;
	onChange?: (rating: number) => void;
};

const RatingComponent = memo(
	({ rating = 0, isEdit = false, onChange }: TRating) => {
		return (
			<div>
				{[...Array(5)].map((_e, i) => (
					<span key={i} style={{ cursor: isEdit ? 'pointer' : 'default' }}>
						<Star
							onClick={() => onChange?.(i)}
							fill={i <= rating ? 'gold' : 'gray'}
						/>
					</span>
				))}
			</div>
		);
	}
);

RatingComponent.displayName = 'Rating';

export const Rating = RatingComponent;
