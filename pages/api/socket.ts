import { Server } from "socket.io"

export default function SocketHandler(req: any, res: any) {
	if (res.socket.server.io) {
		console.log("Socket is already up")
		res.end()
		return
	}

	const io = new Server(res.socket.server)
	res.socket.server.io = io

	res.end()
}
