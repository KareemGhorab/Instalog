import prisma from "clients/prismaClient"
import { NextApiRequest, NextApiResponse } from "next"
import { createRouter } from "next-connect"

const router = createRouter<NextApiRequest, NextApiResponse>()

router
	.get(async (req, res) => {
		const documents = await prisma.event.findMany()
		res
			.status(200)
			.json({ message: "Events retrieved successfully", documents })
	})

export default router.handler({
	onError: (err, req, res) => {
		console.error(err)
		res.status(500).json({ message: "Error with the (all) events handler" })
	},
	onNoMatch: (req, res) => {
		res.status(404).json({ message: "Route doesn't exist" })
	},
})
