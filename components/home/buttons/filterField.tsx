import { User } from "@prisma/client"
import React from "react"

export default function FilterField(props: {
	onReset: any
	onFilter: (id: string) => void
	documents: User[]
	title: string
}) {
	const { onFilter, onReset, documents, title } = props

	return (
		<>
			<fieldset className="border-b border-primary-500 mb-5">
				<h3>{title}</h3>
				<li
					className="text-primary-500 cursor-pointer mt-3
				hover:text-primary-700"
					onClick={onReset}
				>
					all
				</li>
				{documents.length? documents.map((user: User) => (
					<li
						className="text-primary-500 cursor-pointer mt-3
				hover:text-primary-700"
						key={user.id}
						onClick={() => onFilter(user.id)}
					>
						{user.email}
					</li>
				)) : "Loading"}
			</fieldset>
		</>
	)
}
