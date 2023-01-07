import { EventLog } from "interfaces/EventLog"
import Image from "next/image"
import { useEffect, useState } from "react"
import ExpandedTI from "./expandedTI"
import { formateUTCDate } from "utils/dateFormater"

export default function Table(props: {
	events: EventLog[]
	className?: string
	isLoading?: boolean
}) {
	const { events, className, isLoading } = props

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
					items-center
					relative"
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
									<td>{formateUTCDate(event.occurred_at.toString())}</td>
									<td
										onClick={() => setExpandedIndex(index)}
										className="absolute right-7 rounded-full
									cursor-pointer text-primary-50
									hover:text-primary-400"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="currentColor"
											className="w-6 h-6"
										>
											<path
												fillRule="evenodd"
												d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
												clipRule="evenodd"
											/>
										</svg>
									</td>
								</tr>
							)
					  )}
			</tbody>
		</table>
	)
}
