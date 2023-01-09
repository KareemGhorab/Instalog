import axios from "axios"
import useSWR from "swr"

import { AxiosRequestConfig } from "axios/index"

const fetcher = (config: AxiosRequestConfig<any>) =>
	axios.request(config).then((res) => res.data)

const useFetch = (config: AxiosRequestConfig<any>) => {
	const { data, isLoading, error, mutate } = useSWR(config, fetcher, {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	})

	return {
		data,
		isLoading,
		error,
		mutate,
	}
}

export default useFetch
