import axios from "axios"
import { ACTIONS, useEventsDispatch } from "context/EventsContext"
import { EventLog } from "interfaces/EventLog"
import React, { useEffect, useState } from "react"
import { io } from "socket.io-client"

let socket: any = null

export default function Live(props: { className?: string }) {
	const { className } = props
	const [isLive, setIsLive] = useState(false)
	const eventsDispatch = useEventsDispatch()

	useEffect(() => {
		axios.get("/api/socket")
		socket = io()

		if (!isLive) {
			socket.on("new-event", () => {})
			return
		}

		socket.on("new-event", (event: EventLog) => {
			console.log(event)
			eventsDispatch({ type: ACTIONS.PREPEND, payload: { event } })
		})
	}, [isLive, eventsDispatch])

	return (
		<button
			className={`searchBar__btn border rounded-r-lg ${className}`}
			onClick={() => setIsLive((prev) => !prev)}
		>
			<div
				className={`w-3 h-3 rounded-full ${
					isLive ? "bg-green-500" : "bg-red-700"
				}`}
			></div>
			Live
		</button>
	)
}
