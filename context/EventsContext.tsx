import useFetch from "hooks/useFetch"
import { EventLog } from "interfaces/EventLog"
import React, {
	Dispatch,
	useCallback,
	useContext,
	useEffect,
	useReducer,
} from "react"
import { compare } from "utils/objectCompare"

const EventsContext = React.createContext<State>({
	events: [],
	isLoading: false,
	params: { page: 1 },
})
const EventsDispatchContext = React.createContext<Dispatch<Action>>(() => null)

export const useEvents = () => useContext(EventsContext)
export const useEventsDispatch = () => useContext(EventsDispatchContext)

export enum ACTIONS {
	LOAD_MORE,
	PREPEND,
	RESET,
	SEARCH,
	FILTER_ACTOR_ID,
	RESET_ACTOR_ID_FILTER,
	REPLACE,
	APPEND,
	SET_LOADING,
}

interface State {
	events: EventLog[]
	isLoading: boolean
	error?: Error
	params: {
		page: number
		search?: string
		actor_id?: string
	}
}

interface Action {
	type: ACTIONS
	payload?: {
		event?: EventLog
		events?: EventLog[]
		search?: string
		actor_id?: string
		isLoading?: boolean
	}
}

export default function EventsProvider(props: { children: JSX.Element }) {
	const reducer = useCallback((state: State, action: Action): State => {
		const { params: prevParams, events: prevEvents } = state

		let newState = state

		switch (action.type) {
			// No params change
			case ACTIONS.PREPEND:
				if (!action?.payload?.event) break
				return {
					...state,
					events: [action.payload.event, ...prevEvents.slice(0, -1)],
				}
			case ACTIONS.REPLACE:
				if (!action?.payload?.events) break
				return { ...state, events: action.payload.events }
			case ACTIONS.APPEND:
				if (!action?.payload?.events) break
				return { ...state, events: [...state.events, ...action.payload.events] }
			case ACTIONS.SET_LOADING:
				if (!action?.payload?.isLoading) break
				return { ...state, isLoading: action.payload.isLoading }

			// Params change
			case ACTIONS.LOAD_MORE:
				newState = {
					...state,
					params: { ...prevParams, page: prevParams.page + 1 },
				}
				break
			case ACTIONS.SEARCH:
				let searchTerm = ""
				if (action?.payload?.search) searchTerm = action.payload.search
				newState = {
					...state,
					events: [],
					params: { ...prevParams, page: 1, search: searchTerm },
				}
				break
			case ACTIONS.FILTER_ACTOR_ID:
				if (!action?.payload?.actor_id) break
				newState = {
					...state,
					events: [],
					params: { ...prevParams, page: 1, actor_id: action.payload.actor_id },
				}
				break
			case ACTIONS.RESET_ACTOR_ID_FILTER:
				if (!prevParams.actor_id) break
				const resetFilterParams = { ...prevParams }
				delete resetFilterParams.actor_id
				newState = { ...state, events: [], params: resetFilterParams }
				break
			case ACTIONS.RESET:
				newState = { ...state, params: { ...prevParams, page: 1 } }
				break

			default:
				return state
		}

		if (compare(newState.params, state.params)) return state
		return newState
	}, [])

	const [state, dispatch] = useReducer(reducer, {
		events: [],
		isLoading: false,
		params: { page: 1 },
	})

	const { data, isLoading } = useFetch({
		baseURL: "/api",
		url: "/events",
		params: state.params,
	})

	useEffect(() => {
		if (!data) return
		dispatch({ type: ACTIONS.APPEND, payload: { events: data.documents } })
	}, [data])

	useEffect(() => {
		dispatch({ type: ACTIONS.SET_LOADING, payload: { isLoading } })
	}, [isLoading])

	return (
		<>
			<EventsContext.Provider value={state}>
				<EventsDispatchContext.Provider value={dispatch}>
					{props.children}
				</EventsDispatchContext.Provider>
			</EventsContext.Provider>
		</>
	)
}
