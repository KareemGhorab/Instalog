import useFetch from "hooks/useFetch"
import { EventLog } from "interfaces/EventLog"
import events from "pages/api/events"
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
	params: { last_id: "" },
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
	FILTER_TARGET_ID,
	RESET_TARGET_ID_FILTER,
	FILTER_ACTION_ID,
	RESET_ACTION_ID_FILTER,
	REPLACE,
	APPEND,
	SET_LOADING,
}

interface State {
	events: EventLog[]
	isLoading: boolean
	error?: Error
	params: {
		last_id?: string
		search?: string
		actor_id?: string
		target_id?: string
		action_id?: string
	}
}

interface Action {
	type: ACTIONS
	payload?: {
		event?: EventLog
		events?: EventLog[]
		search?: string
		actor_id?: string
		target_id?: string
		action_id?: string
		isLoading?: boolean
	}
}

const reducer = (state: State, action: Action): State => {
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
		case ACTIONS.APPEND:
			if (!action?.payload?.events) break
			return { ...state, events: [...state.events, ...action.payload.events] }
		case ACTIONS.REPLACE:
			if (!action?.payload?.events) break
			return { ...state, events: action.payload.events }
		case ACTIONS.SET_LOADING:
			if (action?.payload?.isLoading === undefined) break
			return { ...state, isLoading: action.payload.isLoading }

		// Params change
		case ACTIONS.LOAD_MORE:
			if (!state.events.length) break
			newState = {
				...state,
				params: {
					...prevParams,
					last_id: state.events[state.events.length - 1].id,
				},
			}
			break
		case ACTIONS.SEARCH:
			let searchTerm = ""
			if (action?.payload?.search) searchTerm = action.payload.search
			newState = {
				...state,
				events: [],
				params: { ...prevParams, last_id: "", search: searchTerm },
			}
			break
		case ACTIONS.RESET:
			newState = { ...state, events: [], params: { last_id: "" } }
			break

		//Filters
		case ACTIONS.FILTER_ACTOR_ID:
			newState = filterByName(prevParams, state, "actor_id", action)
			break
		case ACTIONS.RESET_ACTOR_ID_FILTER:
			if (!prevParams.actor_id) break
			const resetActorFilterParams = { ...prevParams }
			delete resetActorFilterParams.actor_id
			newState = { ...state, events: [], params: resetActorFilterParams }
			break
		case ACTIONS.FILTER_TARGET_ID:
			newState = filterByName(prevParams, state, "target_id", action)
			break
		case ACTIONS.RESET_TARGET_ID_FILTER:
			if (!prevParams.target_id) break
			const resetTargetFilterParams = { ...prevParams }
			delete resetTargetFilterParams.target_id
			newState = { ...state, events: [], params: resetTargetFilterParams }
			break

		default:
			return state
	}

	if (compare(newState.params, state.params)) return state
	return newState
}

const filterByName = (
	params: any,
	state: State,
	filterName: string,
	action: any
): State => {
	if (!action?.payload[filterName]) return state
	return {
		...state,
		events: [],
		params: {
			...params,
			last_id: "",
			[filterName]: action?.payload[filterName],
		},
	}
}

export default function EventsProvider(props: { children: JSX.Element }) {
	const [state, dispatch] = useReducer(reducer, {
		events: [],
		isLoading: false,
		params: { last_id: "" },
	})

	const { data, isLoading: isFetching } = useFetch({
		baseURL: "/api",
		url: "/events",
		params: state.params,
	})

	useEffect(() => {
		dispatch({ type: ACTIONS.SET_LOADING, payload: { isLoading: isFetching } })
	}, [isFetching])

	useEffect(() => {
		if (!data?.documents) return

		dispatch({ type: ACTIONS.APPEND, payload: { events: data.documents } })
	}, [data?.documents])

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
