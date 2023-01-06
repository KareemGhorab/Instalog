import prisma from "clients/prismaClient"
import { NextApiRequest, NextApiResponse } from "next"
import { createRouter } from "next-connect"

import { validate } from "middlewares/validate.middleware"
import { eventSchema } from "schema/event.schema"

const router = createRouter<NextApiRequest, NextApiResponse>()

router.get(async (req, res) => {
	if (!(typeof req.query.id === "string")) return new Error("Invalid Id")

	console.log(req.query.id)

	const document = await prisma.event.findUnique({
		where: {
			id: req.query.id,
		},
		include: {
			action: true,
			actor: true,
			metadata: true,
			target: true,
		},
	})
	if (!document) return res.status(404).json({ message: "No event found" })
	res.status(200).json({ message: "Event retrieved successfully", document })
})

export default router.handler({
	onError: (err, req, res) => {
		console.error(err)
		res.status(500).json({ message: "Error with the event handler" })
	},
	onNoMatch: (req, res) => {
		res.status(404).json({ message: "Route doesn't exist" })
	},
})
