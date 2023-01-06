import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"
import { validate } from "../../../server/validate.middleware"
import { eventSchema } from "../../../server/schemas/event.schema"

const prisma = new PrismaClient()

interface QueryOptions {
	skip: number
	take: number
	where?: {
		OR: [
			{ actor_id: { contains: string } },
			{ actor_name: { contains: string } },
			{ target_id: { contains: string } },
			{ target_name: { contains: string } },
			{
				action: {
					OR: [{ id: { contains: string } }, { name: { contains: string } }]
				}
			}
		]
	}
}

const PAGE_SIZE = 5
async function handler(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case "GET":
			const options: QueryOptions = {
				skip: 0,
				take: PAGE_SIZE,
			}

			const { page, search } = req.query

			if (page && +page > 0) options.skip = +page
			if (search && typeof search === "string") {
				const contains = { contains: search }
				options.where = {
					OR: [
						{ actor_id: contains },
						{ actor_name: contains },
						{ target_id: contains },
						{ target_name: contains },
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
			break
		case "POST":
			const document = await prisma.event.create({
				data: req.body,
			})
			res.status(201).json({ message: "Event added Successfully", document })
			break
		default:
			res.status(404).json({ message: "Route doesn't exist" })
	}
}

export default validate(eventSchema, handler)
