import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"

type Data = {
	name: string
}

const prisma = new PrismaClient()

// Services
const getEvents = async () => {
    
}

const addEvent = async () => {
    
}

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
    if (req.method === "GET") {
        
    } else {

    }
}
