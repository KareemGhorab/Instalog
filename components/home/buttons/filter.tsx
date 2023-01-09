import FilterIcon from "components/icons/filterIcon"
import { ACTIONS, useEventsDispatch } from "context/EventsContext"
import useFetch from "hooks/useFetch"
import { User } from "interfaces/EventLog"
import { useState } from "react"

export default function Filter(props: { className?: string }) {
	const { className } = props

	const { data, isLoading } = useFetch({
		baseURL: "/api",
		url: "/user",
	})
	const [isDropdown, setIsDropdown] = useState(false)
	const eventsDispatch = useEventsDispatch()

	const onClick = (actor_id: string) => {
		eventsDispatch({ type: ACTIONS.FILTER_ACTOR_ID, payload: { actor_id } })
	}
	const onReset = () => {
		eventsDispatch({ type: ACTIONS.RESET_ACTOR_ID_FILTER })
	}

	return (
		<div className=" relative">
			<button
				className={`searchBar__btn border ${className}`}
				onClick={() => setIsDropdown((prev) => !prev)}
			>
				<FilterIcon />
				Filter
			</button>
			{isDropdown && !isLoading && (
				<ul
					className="absolute bg-primary-100 p-3 w-fit
				rounded-lg z-10"
				>
					<li
						className="text-primary-500 cursor-pointer mt-3
							hover:text-primary-700"
						onClick={onReset}
					>
						all
					</li>
					{data.documents.map((user: User) => (
						<li
							className="text-primary-500 cursor-pointer mt-3
							hover:text-primary-700"
							key={user.id}
							onClick={() => onClick(user.id)}
						>
							{user.email}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}
