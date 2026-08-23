import { useCallback } from "react";
import { IErrorResponse, useDeleteLikeProductMutation, useSetLikeProductMutation } from "../store/api/productsApi";
import { userSelectors } from "../store/slices/user";
import { useAppSelector } from "../store/utils";
import { toast } from "react-toastify";

export const useProductLike = (product: Product) => {
  const accessToken = useAppSelector(userSelectors.getAccessToken);
  const user = useAppSelector(userSelectors.getUser);
  
  const [setLike] = useSetLikeProductMutation();
  const [deleteLike] = useDeleteLikeProductMutation();

const isLike = product?.likes.some((l) => l.userId === user?.id);

  const onToggleLike = useCallback(async () => {
		if (!accessToken) {
			toast.warning('Вы не авторизованы');
			return;
		}
		let response;
		if (isLike) {
			response = await deleteLike({ id: `${product.id}` });
		} else {
			response = await setLike({ id: `${product.id}` });
		}

		if (response.error) {
			const error = response.error as IErrorResponse;
			toast.error(error.data.message);
		}
	}, [accessToken, isLike, product.id, setLike, deleteLike]);

  return {onToggleLike, isLike};
};