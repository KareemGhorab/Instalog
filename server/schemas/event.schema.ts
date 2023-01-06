import * as yup from "yup"

export const eventSchema = yup.object().shape({
	actor_id: yup.string().required(),
	actor_name: yup.string().required(),
	group: yup.string().required(),
	target_id: yup.string().required(),
	target_name: yup.string().required(),
	location: yup.string().required(),
	object: yup.string().default("event"),
	action: yup
		.object()
		.shape({
			create: yup
				.object({
					name: yup.string().required(),
					object: yup.string().default("event_action"),
				})
				.required(),
		})
		.required(),
	metadata: yup
		.object()
		.shape({
			create: yup
				.object({
					redirect: yup.string().required(),
					description: yup.string().required(),
				})
				.required(),
		})
		.required(),
})
