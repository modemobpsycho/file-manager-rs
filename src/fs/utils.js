import { sep } from 'node:path'

export const getNameFile = data => {
	const index = data.lastIndexOf(sep)
	const nameFile = data.slice(index + 1)

	return nameFile
}
