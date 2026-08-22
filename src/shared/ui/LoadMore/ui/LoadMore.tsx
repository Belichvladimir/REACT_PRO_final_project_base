import { Alert, CircularProgress, Stack } from '@mui/material';
import { useEffect, useRef } from 'react';

type LoadMoreProps = {
	isFetching: boolean;
	isEndOfList: boolean;
	onLoadMore: () => void;
};

export const LoadMore = ({
	isFetching,
	isEndOfList,
	onLoadMore,
}: LoadMoreProps) => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		let observer: IntersectionObserver | undefined;
		if (ref.current && !isEndOfList) {
			observer = new IntersectionObserver(
				(entries) => {
					if (entries[0].isIntersecting) {
						onLoadMore();
					}
				},
				{ threshold: 0.5 }
			);
			observer.observe(ref.current);
		}
		return () => observer?.disconnect();
	}, [onLoadMore, isEndOfList]);

	return (
		<Stack
			ref={ref}
			direction='row'
			justifyContent='center'
			alignItems='center'
			sx={{ my: 5 }}>
			{isFetching && <CircularProgress />}
			{isEndOfList && <Alert severity='success'>End of list!</Alert>}
		</Stack>
	);
};
