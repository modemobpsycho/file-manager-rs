import { rm } from 'node:fs/promises'
import { env } from 'node:process'
import { messageFsFailed } from '../utils.js'
import { checkAbsolutePath } from '../navigation/utils.js'
import path from 'node:path'

export const removeFile = async data => {
	const { isAbsolutePath, normalPath } = checkAbsolutePath(data)

	const pathToFile = isAbsolutePath
		? path.resolve(normalPath)
		: path.resolve(env.work_directory, normalPath)
		
	await rm(pathToFile).catch(messageFsFailed)
}
