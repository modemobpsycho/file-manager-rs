import { messageCurrentPath, messageFsFailed } from '../utils.js'
import { createReadStream } from 'node:fs'
import { env } from 'node:process'
import { EOL } from 'node:os'
import { checkAbsolutePath } from '../navigation/utils.js'
import path from 'node:path'

export const readFile = async data => {
	const { isAbsolutePath, normalPath } = checkAbsolutePath(data)

	const pathReadFile = isAbsolutePath
		? path.resolve(normalPath)
		: path.resolve(env.work_directory, normalPath)

	const readFile = createReadStream(pathReadFile, { encoding: 'utf8' })
	
	readFile.on('data', chunk => console.log(`${EOL}${chunk}${EOL}`))
	readFile.on('error', messageFsFailed)
	readFile.on('end', messageCurrentPath)
}
