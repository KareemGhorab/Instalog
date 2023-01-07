import useFetch from "hooks/useFetch"
import { useEffect, useState } from "react"
import { CSVLink } from "react-csv"

const flattenEvents = (events: any[]): any[] => {
	return events.map((event) => {
		event.action = event.action.name
		event.actor_name = event.actor.name
		event.actor_email = event.actor.email
		event.actor_id = event.actor.id
		return event
	})
}

export default function CSV(props: { className?: string }) {
	const { data, isLoading } = useFetch({
		url: "/events/all",
		baseURL: "/api",
	})

	if (isLoading || !data?.documents) {
		return (
			<div className={`searchBar__btn border ${props.className}`}>
				Loading..
			</div>
		)
	}

	return (
		<CSVLink
			filename="Instalog_logs"
			className={`searchBar__btn border ${props.className}`}
			data={data.documents}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				className="w-4 h-4"
			>
				<path d="M12 1.5a.75.75 0 01.75.75V7.5h-1.5V2.25A.75.75 0 0112 1.5zM11.25 7.5v5.69l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V7.5h3.75a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9a3 3 0 013-3h3.75z" />
			</svg>
			Export
		</CSVLink>
	)
}
