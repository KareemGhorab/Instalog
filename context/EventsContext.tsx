import { EventLog } from "interfaces/EventLog"
import React, { Dispatch, useContext, useReducer } from "react"

const EventsContext = React.createContext<State>({ events: [] })
const EventsDispatchContext = React.createContext<Dispatch<Action>>(() => null)

export const useEvents = () => useContext(EventsContext)
export const useEventsDispatch = () => useContext(EventsDispatchContext)

export enum ACTIONS {
	APPEND,
	REPLACE,
}

interface State {
	events: EventLog[]
}

interface Action {
	type: ACTIONS
	payload: {
		events: EventLog[]
	}
}

const reducer = (state: State, action: Action) => {
	switch (action.type) {
		case ACTIONS.REPLACE:
			return { ...state, events: action.payload.events }
		case ACTIONS.APPEND:
			return { ...state, events: [...state.events, ...action.payload.events] }
		default:
			return state
	}
}

export default function EventsProvider(props: { children: JSX.Element }) {
	const [state, dispatch] = useReducer(reducer, { events: [] })

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
