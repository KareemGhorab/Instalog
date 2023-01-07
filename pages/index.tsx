import { useEffect, useState } from "react"
import { SubmitHandler } from "react-hook-form"

import useFetch from "hooks/useFetch"
import { ACTIONS, useEventsDispatch } from "context/EventsContext"

import SearchBar from "components/home/SearchBar"
import Table from "components/home/table"

export default function Home() {
	const eventsDispatch = useEventsDispatch()

	const [params, setParams] = useState<{ page: number; search?: string }>({
		page: 1,
	})
	const { data, isLoading } = useFetch({
		baseURL: "/api",
		url: "/events",
		params,
	})

	const onSubmit: SubmitHandler<any> = (data) => {
		eventsDispatch({
			type: ACTIONS.REPLACE,
			payload: { events: [] },
		})
		setParams({ page: 1, search: data.search })
	}

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
				<header>
					<SearchBar onSubmit={onSubmit} />
				</header>
				<div>
					{/* <fieldset
						className="text-primary-700 border-primary-400
						border border-l-0 rounded-r-lg text-xs
						flex"
					>
						<button
							type="submit"
							className="
							flex justify-center items-center gap-1
							px-3  border-primary-400 border-r"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-4 h-4"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
								/>
							</svg>
							FILTER
						</button>
						<button
							className="px-3
							flex justify-center items-center gap-1
							border-primary-400 border-r"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								className="w-4 h-4"
							>
								<path d="M12 1.5a.75.75 0 01.75.75V7.5h-1.5V2.25A.75.75 0 0112 1.5zM11.25 7.5v5.69l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V7.5h3.75a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9a3 3 0 013-3h3.75z" />
							</svg>
							EXPORT
						</button>
						<button
							className="px-3
							flex justify-center items-center gap-1"
						>
							<div
								className={`w-3 h-3 rounded-full ${
									isLive ? "bg-green-500" : "bg-red-500"
								}`}
							></div>
							LIVE
						</button>
					</fieldset> */}
					{/* <section>
						<Table events={fullList} isLoading={isLoading} />
					</section> */}
				</div>
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
