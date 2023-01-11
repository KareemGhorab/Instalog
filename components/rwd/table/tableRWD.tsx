import { useEffect } from "react"

import TIRWD from "./tIRWD"
import ExpandedTIRWD from "./expandedTIRWD"
import { EventLog } from "interfaces/EventLog"

export default function TableRWD(props: {
	className?: string
	expandedIndex: number
	setExpandedIndex: Function
	events: EventLog[]
	isLoading: boolean
}) {
	const { className, events, expandedIndex, setExpandedIndex, isLoading } = props

	useEffect(() => {
		setExpandedIndex(-1)
	}, [events, setExpandedIndex])

	return (
		<table className={`w-full ${className}`}>
			<tbody>
				{isLoading
					? Array.apply(null, new Array(5)).map((_, i) => (
							<tr
								className="w-full
					grid grid-cols-1 gap-1
					items-center"
								key={i}
							>
								<td className="flex items-center
								gap-5 flex-col">
									<div className="loading w-3/5 mt-5"></div>
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
