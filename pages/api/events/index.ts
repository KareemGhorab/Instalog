import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import { createRouter } from "next-connect"

import { validate } from "middlewares/validate.middleware"
import { eventSchema } from "schema/event.schema"

const PAGE_SIZE = 5
interface QueryOptions {
	skip: number
	take: number
	include?: any
	where?: {
		OR: [
			{
				actor: {
					OR: [
						{ id: { contains: string } },
						{ name: { contains: string } },
						{ email: { contains: string } }
					]
				}
			},
			{
				action: {
					OR: [{ id: { contains: string } }, { name: { contains: string } }]
				}
			}
		]
	}
}

const prisma = new PrismaClient()
const router = createRouter<NextApiRequest, NextApiResponse>()

router
	.get(async (req, res) => {
		const options: QueryOptions = {
			skip: 0,
			take: PAGE_SIZE,
			include: {
				action: true,
				actor: true,
				metadata: true,
				target: true,
			},
		}

		const { page, search } = req.query

		if (page && +page > 0) options.skip = +page
		if (search && typeof search === "string") {
			const contains = { contains: search }
			options.where = {
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

		const documents = await prisma.event.findMany(options)

		res
			.status(200)
			.json({ message: "Events retrieved successfully", documents })
	})
	.use(validate(eventSchema))
	.post(async (req, res) => {
		const document = await prisma.event.create({
			data: req.body,
		})
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
