export const formateUTCDate = (dateStr: string) =>
	new Date(dateStr.toString()).toUTCString()
