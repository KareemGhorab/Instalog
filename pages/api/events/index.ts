import prisma from "clients/prismaClient"
import { NextApiRequest } from "next"
import { createRouter } from "next-connect"

import { validate } from "middlewares/validate.middleware"
import { eventSchema } from "schema/event.schema"

const PAGE_SIZE = 5

const router = createRouter<NextApiRequest, any>()

router
	.get(async (req, res) => {
		let options: any = {
			take: PAGE_SIZE,
		}

		const { search, actor_id, target_id, action_id, last_id } = req.query

		if (last_id && typeof last_id === "string")
			options = { ...options, take: PAGE_SIZE + 1, cursor: { id: last_id } }
		if (search && typeof search === "string") {
			const contains = { contains: search }
			options.where = {
				...options.where,
				OR: [
					{
						actor: {
							OR: [{ id: contains }, { name: contains }, { email: contains }],
						},
					},
					{
						action: {
							OR: [{ id: contains }, { name: contains }],
						},
					},
				],
			}
		}
		if (actor_id) options.where = { ...options.where, actor_id }
		if (target_id) options.where = { ...options.where, target_id }
		if (action_id) options.where = { ...options.where, action_id }

		const documents = await prisma.event.findMany({
			select: {
				actor: true,
				id: true,
				occurred_at: true,
				action: {
					select: {
						name: true,
					},
				},
			},
			orderBy: { occurred_at: "desc" },
			...options,
		})

		if (last_id) documents.shift()

		res
			.status(200)
			.json({ message: "Events retrieved successfully", documents })
	})
	.use(validate(eventSchema))
	.post(async (req, res) => {
		const document = await prisma.event.create({
			data: req.body,
		})

		const miniDoc = await prisma.event.findFirst({
			where: {
				id: document.id,
			},
			select: {
				actor: true,
				id: true,
				occurred_at: true,
				action: {
					select: {
						name: true,
					},
				},
			},
		})

		res?.socket?.server?.io.emit("new-event", miniDoc)

		res.status(201).json({ message: "Event added Successfully", document })
	})

export default router.handler({
	onError: (err, req, res) => {
		console.error(err)
		res.status(500).json({ message: "Error with the events handler" })
	},
	onNoMatch: (req, res) => {
		res.status(404).json({ message: "Route doesn't exist" })
	},
})
