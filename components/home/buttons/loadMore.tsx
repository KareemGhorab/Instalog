import { ACTIONS, useEventsDispatch } from "context/EventsContext"
import React from "react"

export default function LoadMore(props: { className?: string }) {
	const eventsDispatch = useEventsDispatch()

	return (
		<button
			onClick={() => eventsDispatch({ type: ACTIONS.LOAD_MORE })}
			className={`card--main__footer ${props.className}`}
		>
			LOAD MORE
		</button>
	)
}
