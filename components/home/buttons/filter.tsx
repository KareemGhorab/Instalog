import FilterIcon from "components/icons/filterIcon"
import { ACTIONS, useEventsDispatch } from "context/EventsContext"
import useFetch from "hooks/useFetch"
import { useState } from "react"
import FilterField from "./filterField"

export default function Filter(props: { className?: string }) {
	const { className } = props

	const { data, isLoading } = useFetch({
		baseURL: "/api",
		url: "/user",
	})
	const [isDropdown, setIsDropdown] = useState(false)
	const eventsDispatch = useEventsDispatch()

	const filter = (id: string, fieldName: string, actionType: ACTIONS) => {
		eventsDispatch({ type: actionType, payload: { [fieldName]: id } })
	}
	const reset = (actionType: ACTIONS) => {
		eventsDispatch({ type: actionType })
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
					<FilterField
						title="Actor"
						onFilter={(id: string) =>
							filter(id, "actor_id", ACTIONS.FILTER_ACTOR_ID)
						}
						onReset={() => reset(ACTIONS.RESET_ACTOR_ID_FILTER)}
						documents={data.documents}
					/>
					<FilterField
						title="Target"
						onFilter={(id: string) =>
							filter(id, "target_id", ACTIONS.FILTER_TARGET_ID)
						}
						onReset={() => reset(ACTIONS.RESET_TARGET_ID_FILTER)}
						documents={data.documents}
					/>
				</ul>
			)}
		</div>
	)
}
