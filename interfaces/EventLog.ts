export interface Action {
	id: string
	name: string
}

export interface Metadata {
	request_id: string
	redirect: string
	description: string
}

export interface User {
	id: string
	name: string
	email: string
	image: string
}

export interface EventLog {
	id: string
	object: string
	location: string
	occurred_at: Date
	actor: User | string
	target: User | string
	action: Action | string
	metadata: Metadata | string
}
