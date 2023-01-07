import useFetch from "hooks/useFetch"
import React from "react"
import { formateUTCDate } from "utils/dateFormatter"

export default function ExpandedTI(props: { eventId: string }) {
	const { data, isLoading, error } = useFetch({
		baseURL: "/api",
		url: `/events/${props.eventId}`,
	})

	return (
		<tr className="table--main__body__tr--expanded">
			{isLoading ? (
				""
			) : (
				<>
					<td
						className="grid grid-cols-4 gap-y-4
				text-extra-500"
					>
						<span className="col-span-4">ACTOR</span>
						<span>Name</span>
						<span className="text-black col-span-3">
							{data.document.actor.name}
						</span>
						<span>Email</span>
						<span className="text-black col-span-3">
							{data.document.actor.email}
						</span>
						<span>ID</span>
						<span className="text-black col-span-3">
							{data.document.actor.id}
						</span>
					</td>
					<td
						className="grid grid-cols-4 gap-y-4
				text-extra-500"
					>
						<span className="col-span-4">ACTION</span>
						<span>Name</span>
						<span className="text-black col-span-3">
							{data.document.action.name}
						</span>
						<span>Email</span>
						<span className="text-black col-span-3">event_action</span>
						<span>ID</span>
						<span className="text-black col-span-3">
							{data.document.action.id}
						</span>
					</td>
					<td
						className="grid grid-cols-4 gap-y-4
				text-extra-500"
					>
						<span className="col-span-4">DATE</span>
						<span>Readable</span>
						<span className="text-black col-span-3">
							{formateUTCDate(data.document.occurred_at.toString())}
						</span>
					</td>
					<td
						className="grid grid-cols-4 gap-y-4
				text-extra-500"
					>
						<span className="col-span-4">METADATA</span>
						<span>Redirect</span>
						<span className="text-black col-span-3">
							{data.document.metadata.redirect}
						</span>
						<span>Description</span>
						<span className="text-black col-span-3">
							{data.document.metadata.description}
						</span>
						<span>Request ID</span>
						<span className="text-black col-span-3">
							{data.document.metadata.request_id}
						</span>
					</td>
					<td
						className="grid grid-cols-4 gap-y-4
				text-extra-500"
					>
						<span className="col-span-4">TARGET</span>
						<span>Name</span>
						<span className="text-black col-span-3">
							{data.document.target.name}
						</span>
						<span>Email</span>
						<span className="text-black col-span-3">
							{data.document.target.email}
						</span>
						<span>ID</span>
						<span className="text-black col-span-3">
							{data.document.target.id}
						</span>
					</td>
				</>
			)}
		</tr>
	)
}
