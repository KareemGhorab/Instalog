import { useEffect, useRef, useState } from "react"

import ExpandedTIRWD from "./expandedTIRWD"
import TIRWD from "./tIRWD"
import { EventLog } from "interfaces/EventLog"

export default function TableRWD(props: {
	className?: string
	expandedIndex: number
	setExpandedIndex: Function
	events: EventLog[]
}) {
	const { className, events, expandedIndex, setExpandedIndex } = props

	useEffect(() => {
		setExpandedIndex(-1)
	}, [events, setExpandedIndex])

	return (
		<table className={`w-full ${className}`}>
			<tbody>
				{!events
					? Array.apply(null, new Array(5)).map((_, i) => (
							<tr
								className="w-full
					grid grid-cols-1 gap-1
					items-center"
								key={i}
							>
								<td>
									<div className="loading w-4/5"></div>
								</td>
							</tr>
					  ))
					: events.map((event, index) =>
							expandedIndex === index ? (
								<ExpandedTIRWD key={event.id} eventId={event.id} />
							) : (
								<TIRWD
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
