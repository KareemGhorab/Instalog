import useFetch from "hooks/useFetch"

import { formateUTCDate } from "utils/dateFormatter"
import ExpandedTD from "./expandedTD"

export default function ExpandedTI(props: { eventId: string }) {
	let { data, isLoading } = useFetch({
		baseURL: "/api",
		url: `/events/${props.eventId}`,
	})

	return (
		<tr className="table--main__body__tr--expanded">
			{isLoading ? (
				Array.apply(null, Array(5)).map((_, i) => (
					<ExpandedTD
						key={i}
						header="Loading..."
						data={[
							{
								label: <div className="loading w-3/4"></div>,
								element: <div className="loading w-3/4"></div>,
							},
							{
								label: <div className="loading w-3/4"></div>,
								element: <div className="loading w-3/4"></div>,
							},
							{
								label: <div className="loading w-3/4"></div>,
								element: <div className="loading w-3/4"></div>,
							},
						]}
					/>
				))
			) : (
				<>
					<ExpandedTD
						header="ACTOR"
						data={[
							{ label: "Name", element: data.document.actor.name },
							{ label: "Email", element: data.document.actor.email },
							{ label: "ID", element: data.document.actor.id },
						]}
					/>
					<ExpandedTD
						header="ACTION"
						data={[
							{ label: "Name", element: data.document.action.name },
							{ label: "Object", element: "event_action" },
							{ label: "ID", element: data.document.action.id },
						]}
					/>
					<ExpandedTD
						header="DATE"
						data={[
							{
								label: "Readable",
								element: formateUTCDate(data.document.occurred_at.toString()),
							},
						]}
					/>
					<ExpandedTD
						header="METADATA"
						data={[
							{
								label: "Redirect",
								element: data.document.metadata.redirect,
							},
							{
								label: "Description",
								element: data.document.metadata.description,
							},
							{
								label: "Request ID",
								element: data.document.metadata.request_id,
							},
						]}
					/>
					<ExpandedTD
						header="TARGET"
						data={[
							{ label: "Name", element: data.document.target.name },
							{ label: "Email", element: data.document.target.email },
							{ label: "ID", element: data.document.target.id },
						]}
					/>
				</>
			)}
		</tr>
	)
}
