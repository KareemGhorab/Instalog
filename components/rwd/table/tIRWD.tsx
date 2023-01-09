import { EventLog } from "interfaces/EventLog"
import Image from "next/image"
import { formateUTCDate } from "utils/dateFormatter"

export default function TIRWD(props: {
	event: EventLog
	setExpandedIndex: Function
}) {
	const { event, setExpandedIndex } = props

	return (
		<tr className="relative mb-5" key={event.id}>
			{event && (
				<td
					className="flex--centered flex-col border border-t-0 py-5
                rounded-lg"
				>
					<div>
						<figure className="flex items-center gap-4 my-3">
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
					</div>
					<div>{event.action.name}</div>
					<div className="mt-3">
						{formateUTCDate(event.occurred_at.toString())}
					</div>
					<div
						onClick={() => setExpandedIndex()}
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
					</div>
				</td>
			)}
		</tr>
	)
}
