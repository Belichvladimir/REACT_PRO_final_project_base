import s from './LikeButton.module.css';
import { ReactComponent as LikeSvg } from './../../../assets/icons/like.svg';
import classNames from 'classnames';
import { useAppSelector } from '../../../store/utils';
import { userSelectors } from '../../../store/slices/user';
import {
	useSetLikeProductMutation,
	useDeleteLikeProductMutation,
	IErrorResponse,
} from '../../../store/api/productsApi';
import { toast } from 'react-toastify';
import { memo } from 'react';

type TLikeButtonProps = {
	isLike: boolean;
	toggleLike?: () => Promise<void>;
};
export const LikeButton = memo(({ isLike, toggleLike }: TLikeButtonProps) => {

	return (
		<button
			className={classNames(s['card__favorite'], {
				[s['card__favorite_is-active']]: isLike,
			})}
			onClick={toggleLike}>
			<LikeSvg />
		</button>
	);
});
