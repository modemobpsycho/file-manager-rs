import { rename } from 'node:fs/promises'
import { messageFsFailed } from '../utils.js'
import { env } from 'node:process'
import path, { normalize, isAbsolute } from 'node:path'

export const renameFile = async data => {
	const validData = data.split(/\s/).splice(1)

	const arrInfoPath = validData.reduce((acc, item) => {
		const obj = {}
		obj.path = normalize(item)
		obj.abs = isAbsolute(obj.path)
		acc.push(obj)
		return acc
	}, [])

	const pathToFile = arrInfoPath[0].abs
		? path.resolve(arrInfoPath[0].path)
		: path.resolve(env.work_directory, arrInfoPath[0].path)

	const newName = arrInfoPath[1].abs
		? path.resolve(arrInfoPath[1].path)
		: path.resolve(env.work_directory, arrInfoPath[1].path)

	await rename(pathToFile, newName).catch(messageFsFailed)
}
