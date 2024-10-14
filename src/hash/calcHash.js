import { createHash } from 'node:crypto'
import { createReadStream } from 'node:fs'
import { messageFsFailed, messageCurrentPath } from '../utils.js'
import { checkAbsolutePath } from '../navigation/utils.js'
import { env } from 'node:process'
import { EOL } from 'node:os'
import path from 'node:path'

export const calcHash = data => {
	const { isAbsolutePath, normalPath } = checkAbsolutePath(data.trim())

	const pathToFile = isAbsolutePath
		? path.resolve(normalPath)
		: path.resolve(env.work_directory, normalPath)

	const readFile = createReadStream(pathToFile, { encoding: 'utf8' })

	const hash = createHash('sha256')
	readFile.on('data', chunk => {
		hash.update(chunk)
	})

	readFile.on('error', () => {
		messageFsFailed()
		messageCurrentPath()
	})
	
	readFile.on('end', () => {
		console.log(`${EOL}${hash.digest('hex')}${EOL}`)
		messageCurrentPath()
	})
}
