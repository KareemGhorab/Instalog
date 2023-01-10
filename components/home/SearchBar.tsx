import { ACTIONS, useEventsDispatch } from "context/EventsContext"
import { useState } from "react"

export default function SearchBar(props: { className?: string }) {
	const { className } = props

	const eventsDispatch = useEventsDispatch()
	const [search, setSearch] = useState("")

	function handleSubmit(e: React.FormEvent<HTMLInputElement>) {
		e.preventDefault()
		eventsDispatch({ type: ACTIONS.SEARCH, payload: { search } })
	}

	return (
		<form
			onSubmit={handleSubmit}
			className={`bg-inherit w-full flex ${className}`}
		>
			<input
				value={search}
				onChange={(e:any) => setSearch(e.currentTarget.value)}
				className="w-full rounded-r-none text-primary-700"
				placeholder="Search name, email or action..."
				type="text"
			/>
		</form>
	)
}
