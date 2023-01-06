import axios from "axios"
import useSWR from "swr"

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

const useEvents = () => {
	const { data, isLoading, error } = useSWR("/api/events", fetcher)

	return {
		data,
		isLoading,
		error,
	}
}

export default useEvents
