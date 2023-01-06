import { NextApiRequest, NextApiResponse } from "next"
import ObjectSchema, { ObjectShape } from "yup/lib/object"

export const validate =
	(schema: ObjectSchema<ObjectShape>) =>
	async (req: NextApiRequest, res: NextApiResponse, next: Function) => {
		try {
			await schema.validate(req.body, { abortEarly: false })
		} catch (err) {
			return res.status(400).json(err)
		}
		next()
	}
