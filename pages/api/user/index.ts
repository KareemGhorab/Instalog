import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import { createRouter } from "next-connect"

import { validate } from "middlewares/validate.middleware"
import { userSchema } from "schema/user.schema"

const prisma = new PrismaClient()
const router = createRouter<NextApiRequest, NextApiResponse>()

router
	.get(async (req, res) => {
		const documents = await prisma.user.findMany()
		res.status(200).json({ message: "Users retrieved Successfully", documents })
	})
	.use(validate(userSchema))
	.post(async (req, res) => {
		const document = await prisma.user.create({
			data: req.body,
		})
		res.status(201).json({ message: "User added Successfully", document })
	})

export default router.handler({
	onError: (err, req, res) => {
		console.error(err)
		res.status(500).json({ message: "Error with the users handler" })
	},
	onNoMatch: (req, res) => {
		res.status(404).json({ message: "Route doesn't exist" })
	},
})
