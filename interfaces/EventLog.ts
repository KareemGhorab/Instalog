interface Action {
	id: string
	name: string
}

interface Metadata {
	request_id: string
	redirect: string
	description: string
}

export interface User {
	id: string
	name: string
	email: string
}

export interface EventLog {
	id: string
	object: string
	location: string
	occurred_at: Date
	actor: User
	target: User
	action: Action
	metadata: Metadata
}
