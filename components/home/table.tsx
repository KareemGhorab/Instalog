import { EventLog } from "interfaces/EventLog"
import Image from "next/image"
import { useState } from "react"
import ExpandedTI from "./expandedTI"

export default function Table(props: {
	events: EventLog[]
	className?: string
	isLoading?: boolean
}) {
	const { events, className, isLoading } = props

	const [expandedIndex, setExpandedIndex] = useState(-1)

	return (
		<table className={`w-full ${className}`}>
			<thead
				className="grid grid-cols-3 gap-1 
			bg-primary-200
			text-start
			px-7 pb-3 mb-7"
			>
				<tr>
					<th>ACTOR</th>
				</tr>
				<tr>
					<th>ACTION</th>
				</tr>
				<tr>
					<th>DATE</th>
				</tr>
			</thead>
			<tbody>
				{isLoading
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
								<tr
									className="w-full px-7
					grid grid-cols-3 gap-1
					items-center"
									key={event.id}
								>
									<td>
										<figure
											className="flex items-center gap-4
							my-3"
										>
											<Image
												src={`/${event.actor.image}`}
												alt={`${event.actor.name} profile picture`}
												width={33}
												height={33}
											/>
											<figcaption>
												<p>{event.actor.email}</p>
											</figcaption>
										</figure>
									</td>
									<td>{event.action.name}</td>
									<td>
										{new Date(event.occurred_at.toString()).toUTCString()}
									</td>
								</tr>
							)
					  )}
			</tbody>
		</table>
	)
}
