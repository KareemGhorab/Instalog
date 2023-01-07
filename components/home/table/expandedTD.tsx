import React, { ReactNode } from "react"

type dataType = {
	label: ReactNode
	element: ReactNode
}

export default function ExpandedTD(props: {
	data: dataType[]
	header: ReactNode
}) {
	const { data, header } = props

	return (
		<td
			className="grid grid-cols-4 gap-y-4
				text-extra-500"
		>
			<span className="col-span-4">{header}</span>

			{data.map((element) => (
				<>
					<span>{element.label}</span>
					<div className="text-black col-span-3">{element.element}</div>
				</>
			))}
		</td>
	)
}
