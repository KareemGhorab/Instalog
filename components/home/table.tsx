import { EventLog } from "interfaces/EventLog"

export default function Table(props: { events: EventLog[] }) {
	const { events } = props
	console.log(events)

	return (
		<table>
			<thead>
				<th>Actor</th>
				<th>Action</th>
				<th>Date</th>
			</thead>
			<tbody>
				{events.map((event) => (
					<tr key={event.id}>{event.id}</tr>
				))}
			</tbody>
		</table>
	)
}
