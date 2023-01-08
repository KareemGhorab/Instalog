import axios from "axios"
import { EventLog } from "interfaces/EventLog"
import React, { useEffect, useState } from "react"
import { io } from "socket.io-client"

let socket: any = null

export default function Live(props: {
	className?: string
	onEvent: any
	onClose: Function
}) {
	const { className, onEvent, onClose } = props
	const [isLive, setIsLive] = useState(false)

	useEffect(() => {
		axios.get("/api/socket")
		socket = io()

		if (!isLive) {
			socket.on("new-event", () => {})
			onClose()
			return
		}

		socket.on("new-event", (event: EventLog) => {
			console.log(event)
			onEvent(event)
		})
	}, [isLive, onEvent])

	return (
		<button
			className={`searchBar__btn border ${className}`}
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
