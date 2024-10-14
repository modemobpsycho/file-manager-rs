import { createReadStream, createWriteStream } from 'node:fs'
import { env } from 'node:process'
import { messageFsFailed, messageCurrentPath } from '../utils.js'
import { getNameFile } from './utils.js'
import path, { normalize, isAbsolute } from 'node:path'

export const copyFile = async data => {
	const getPath = data.split(/\s/).slice(1)

	const arrInfoPath = getPath.reduce((acc, item) => {
		const obj = {}
		obj.path = normalize(item)
		obj.abs = isAbsolute(obj.path)
		acc.push(obj)
		return acc
	}, [])

	const pathToFile = arrInfoPath[0].abs
		? path.resolve(arrInfoPath[0].path)
		: path.resolve(env.work_directory, arrInfoPath[0].path)

	const nameFile = getNameFile(pathToFile)

	const pathToDirectory = arrInfoPath[1].abs
		? path.resolve(arrInfoPath[1].path, nameFile)
		: path.resolve(env.work_directory, arrInfoPath[1].path, nameFile)

	const readFile = createReadStream(pathToFile, { encoding: 'utf8' })

	const writeFile = createWriteStream(pathToDirectory, { flags: 'wx' })
	readFile.on('data', chunk => {
		writeFile.write(chunk)
	})

	writeFile.on('error', err => console.log(err))
	readFile.on('error', messageFsFailed)
	readFile.on('end', messageCurrentPath)
}
