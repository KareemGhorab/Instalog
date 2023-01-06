import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"
import { validate } from "../../../server/validate.middleware"
import { userSchema } from "../../../server/schemas/user.schema"

const prisma = new PrismaClient()

async function handler(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case "GET":
			const documents = await prisma.user.findMany()
			res
				.status(200)
				.json({ message: "Users retrieved Successfully", documents })
			break
		case "POST":
			const document = await prisma.user.create({
				data: req.body,
			})
			res.status(201).json({ message: "User added Successfully", document })
			break
		default:
			res.status(404).json({ message: "Route doesn't exist" })
	}
}

export default validate(userSchema, handler)
