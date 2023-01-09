export const compare = (obj1: Object, obj2: any): boolean => {
	if (Object.keys(obj1).length !== Object.keys(obj2).length) return false

	for (const [k, v] of Object.entries(obj1)) {
		if (v !== obj2[k]) return false
	}

	return true
}
