import { useEffect, useRef, useState } from "react"

import { useEvents } from "context/EventsContext"

import ExpandedTI from "./expandedTI"
import TI from "./TI"

export default function Table(props: { className?: string }) {
	const { className } = props

	const eventsState = useEvents()
	const { events } = eventsState

	const [expandedIndex, setExpandedIndex] = useState(-1)

	useEffect(() => {
		setExpandedIndex(-1)
	}, [events])

	return (
		<table className={`w-full ${className}`}>
			<thead>
				<tr
					className="grid grid-cols-3 gap-1 
							bg-primary-200
							text-start
							px-7 pb-3 mb-7"
				>
					<th>ACTOR</th>
					<th>ACTION</th>
					<th>DATE</th>
				</tr>
			</thead>
			<tbody>
				{!events
					? Array.apply(null, new Array(5)).map((_, i) => (
							<tr
								className="w-full px-7
					grid grid-cols-3 gap-1
					items-center"
								key={i}
							>
								<td
									className="flex items-center gap-4
							my-3"
								>
									<div
										className="w-10 h-10 rounded-full
									bg-primary-300"
									></div>
									<div className="loading w-2/5"></div>
								</td>
								<td>
									<div className="loading w-3/5"></div>
								</td>
								<td>
									<div className="loading w-3/5"></div>
								</td>
							</tr>
					  ))
					: events.map((event, index) =>
							expandedIndex === index ? (
								<ExpandedTI key={event.id} eventId={event.id} />
							) : (
								<TI
									key={event.id}
									event={event}
									setExpandedIndex={() => setExpandedIndex(index)}
								/>
							)
					  )}
			</tbody>
		</table>
	)
}
