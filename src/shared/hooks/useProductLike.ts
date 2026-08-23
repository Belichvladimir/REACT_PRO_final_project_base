import { useCallback, useOptimistic, startTransition } from 'react';
import {
	IErrorResponse,
	useDeleteLikeProductMutation,
	useSetLikeProductMutation,
} from '../store/api/productsApi';
import { userSelectors } from '../store/slices/user';
import { useAppSelector } from '../store/utils';
import { toast } from 'react-toastify';

export const useProductLike = (product?: Product) => {
	const accessToken = useAppSelector(userSelectors.getAccessToken);
	const user = useAppSelector(userSelectors.getUser);
	const isLikedOnServer = product?.likes.some((l) => l.userId === user?.id) || false;
	const [optimisticLike, addOptimistic] = useOptimistic(
    isLikedOnServer,
    (_, next: boolean) => next
  	);

	const [setLike] = useSetLikeProductMutation();
	const [deleteLike] = useDeleteLikeProductMutation();

	const onToggleLike = useCallback(async () => {
		if (!accessToken) {
			toast.warning('Вы не авторизованы');
			return;
		}
		const nextValue = !optimisticLike;
		let response;
		addOptimistic(nextValue);
		if (optimisticLike) {
			response = await deleteLike({ id: `${product?.id}` });
		} else {
			response = await setLike({ id: `${product?.id}` });
		}
		if (response?.error) {
			addOptimistic(!nextValue);
			const error = response.error as IErrorResponse;
			toast.error(error.data.message);
		}

	}, [accessToken, optimisticLike, product?.id, setLike, deleteLike]);

	return { onToggleLike, isLike: optimisticLike };
};
