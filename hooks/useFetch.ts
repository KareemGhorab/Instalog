import axios from "axios"
import useSWR from "swr"

import { AxiosRequestConfig } from "axios/index"

const fetcher = (config: AxiosRequestConfig<any>) =>
	axios.request(config).then((res) => res.data)

const useFetch = (config: AxiosRequestConfig<any>) => {
	const { data, isLoading, error } = useSWR(config, fetcher)

	return {
		data,
		isLoading,
		error,
	}
}

export default useFetch
