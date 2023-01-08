import { useCallback, useEffect, useState } from "react"

import useFetch from "hooks/useFetch"
import { ACTIONS, useEventsDispatch } from "context/EventsContext"

import SearchBar from "components/home/SearchBar"
import Table from "components/home/table/table"
import axios from "axios"
import CSV from "components/home/buttons/CSV"
import Live from "components/home/buttons/live"
import { EventLog } from "interfaces/EventLog"

export default function Home() {
	const eventsDispatch = useEventsDispatch()
	const [params, setParams] = useState<{ page: number; search?: string }>({
		page: 1,
	})
	const { data, isLoading, mutate } = useFetch({
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

	const handleLiveEvent = useCallback(
		(event: EventLog) => {
			eventsDispatch({ type: ACTIONS.PREPEND, payload: { events: [event] } })
		},
		[eventsDispatch]
	)

	const reFetch = () => {
		setParams((prev) => ({ ...prev, page: 1 }))
	}

	useEffect(() => {
		if (!data) return
		eventsDispatch({
			type: ACTIONS.APPEND,
			payload: { events: data.documents },
		})
	}, [isLoading, eventsDispatch])

	return (
		<main className="min:h-screen flex--centered py-10 px-2 lg:p-24">
			<div className="card--main">
				<header className="flex--centered bg-primary-200 p-5">
					<SearchBar onSubmit={handleSubmit} />
					<CSV />
					<Live onEvent={handleLiveEvent} onClose={reFetch} />
				</header>
				<section>
					<Table />
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
