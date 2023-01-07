import { useCallback, useEffect, useState } from "react"

import useFetch from "hooks/useFetch"
import { ACTIONS, useEventsDispatch } from "context/EventsContext"

import SearchBar from "components/home/SearchBar"
import Table from "components/home/table/table"
import axios from "axios"
import CSV from "components/home/buttons/CSV"
import Live from "components/home/buttons/live"

export default function Home() {
	const eventsDispatch = useEventsDispatch()

	const [params, setParams] = useState<{ page: number; search?: string }>({
		page: 1,
	})
	const { data, isLoading, error } = useFetch({
		baseURL: "/api",
		url: "/events",
		params,
	})


	useEffect(() => {
		if (isLoading)
			eventsDispatch({ type: ACTIONS.SET_LOADING, payload: { events: [] } })
	}, [isLoading, eventsDispatch])

	const handleSubmit = useCallback(
		(search: string) => {
			eventsDispatch({
				type: ACTIONS.REPLACE,
				payload: { events: [] },
			})
			setParams({ page: 1, search })
		},
		[eventsDispatch]
	)

	useEffect(() => {
		if (!data) return
		eventsDispatch({
			type: ACTIONS.APPEND,
			payload: { events: data.documents },
		})
	}, [data, eventsDispatch])

	return (
		<main className="min:h-screen flex--centered p-10 lg:p-24">
			<div className="card--main">
				<header className="flex--centered bg-primary-200 p-5">
					<SearchBar onSubmit={handleSubmit} />
					<CSV />
					<Live />
				</header>
				<section>
					<Table isLoading={isLoading} />
				</section>
				<button
					onClick={() =>
						setParams((prev) => ({ ...prev, page: prev.page + 1 }))
					}
					className="card--main__footer"
				>
					LOAD MORE
				</button>
			</div>
		</main>
	)
}

export async function getStaticProps() {
	const { data } = await axios.request({
		baseURL: "http://localhost:3000/api",
		url: "/events",
	})
	return {
		props: {
			fallback: {
				"/api/events": data,
			},
		},
	}
}
