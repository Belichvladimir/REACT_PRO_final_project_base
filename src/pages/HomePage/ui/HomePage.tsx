import { WithProtection } from '../../../shared/store/HOCs/WithProtection';
import { WithQuery } from '../../../shared/store/HOCs/WithQuery';
import { LoadMore } from '../../../shared/ui/LoadMore';
import { CardList } from '../../../widgets/CardList';
import { useAppDispatch, useAppSelector } from '../../../shared/store/utils';
import {
	productsActions,
	productsSelectors,
} from '../../../shared/store/slices/products';
import { useGetProductsQuery } from '../../../shared/store/api/productsApi';

const CardListWithQuery = WithQuery(CardList);

export const HomePage = WithProtection(() => {
	const dispatch = useAppDispatch();
	const page = useAppSelector(productsSelectors.getPage);

	const { data, isLoading, isError, error, isFetching } = useGetProductsQuery({
		searchText: '',
		sort: 'newest',
		page,
		perPage: 6,
	});

	const products = data?.products ?? [];
	const productsCount = data?.length ?? 0;
	const isEndOfList = products.length >= productsCount;

	const handleLoadMore = () => {
		if (!isEndOfList && !isFetching) {
			dispatch(productsActions.setPage(page + 1));
		}
	};

	return (
		<>
			<CardListWithQuery
				title='Лакомства'
				isLoading={isLoading}
				isError={isError}
				products={products}
				error={error}
			/>
			<LoadMore
				isFetching={isFetching}
				isEndOfList={isEndOfList}
				onLoadMore={handleLoadMore}
			/>
		</>
	);
});
