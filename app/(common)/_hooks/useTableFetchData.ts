'use client';

import { useCallback, useEffect, useState } from 'react';

type ActionProps = {
	pagination: Record<string, any>;
	sorting: Record<string, any>;
	filtering: string;
	[key: string]: any;
};

type TableFetchDataProps<T extends Record<string, unknown>> = {
	action: ({
		pagination,
		sorting,
		filtering,
	}: ActionProps) => Promise<{ data: T[]; count: number } | undefined>;
	pagination: Record<string, any>;
	sorting: Record<string, any>;
	filtering: string;
	[key: string]: any;
	onSuccess?: (response: any) => void | undefined;
	onError?: (error: any) => void | undefined;
	onFinally?: () => void | undefined;
};

export default function useTableFetchData<T extends Record<string, unknown>>({
	action,
	pagination,
	sorting,
	filtering,
	onSuccess,
	onError,
	onFinally,
	...rest
}: TableFetchDataProps<T>) {
	const [data, setData] = useState<T[]>([]);
	const [count, setCount] = useState(0);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<unknown>(null);

	const fetchData = useCallback(async () => {
		try {
			setLoading(true);
			const response = await action({ pagination, sorting, filtering, ...rest });
			if (!response)
				throw new Error(
					'Unexpected error has been occurred. Please try again later',
				);

			setData(response.data);
			setCount(response.count);
			onSuccess && onSuccess(response);
		} catch (error) {
			setError(error);
			onError && onError(error);
			console.log('error', error);
		} finally {
			setLoading(false);
			onFinally && onFinally();
		}
	}, [pagination, sorting, filtering, action]);

	useEffect(() => {
		fetchData();
	}, [pagination, sorting, filtering, fetchData]);

	return [count, data, loading, error, fetchData];
}
