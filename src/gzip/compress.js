import { createBrotliCompress } from 'node:zlib'
import { createReadStream, createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream/promises'
import { messageCurrentPath, messageFsFailed } from '../utils.js'
import { checkAbsolutePaths } from '../navigation/utils.js'

export const compress = async data => {
	const getPath = data.split(/\s/).slice(1)
	const { pathToFile, pathToDesination } = checkAbsolutePaths(getPath)

	const readFile = createReadStream(pathToFile)
	readFile.on('error', () => {
		messageFsFailed()
		messageCurrentPath()
	})

	const zipFile = createBrotliCompress()
	const writeFile = createWriteStream(pathToDesination)

	writeFile.on('error', () => {
		messageFsFailed()
		messageCurrentPath()
	})

	await pipeline(readFile, zipFile, writeFile)

	messageCurrentPath()
}
