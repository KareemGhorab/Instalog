import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import ObjectSchema, { ObjectShape } from "yup/lib/object"

export const validate =
	(schema: ObjectSchema<ObjectShape>, handler: NextApiHandler) =>
	async (req: NextApiRequest, res: NextApiResponse) => {
		if (req.method && ["POST"].includes(req.method)) {
			try {
				await schema.validate(req.body, { abortEarly: false })
			} catch (err) {
				return res.status(400).json(err)
			}
		}
		await handler(req, res)
	}
