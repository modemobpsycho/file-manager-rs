import { stdin, exit, stdout } from 'node:process'
import { createInterface } from 'node:readline/promises'
import { env } from 'node:process'
import './greeting/greeting.js'
import { messageCurrentPath, messageInvalid } from './utils.js'
import {
	upWorkingDirectory,
	listFiles,
	moveNewWorkingDirectory,
} from './navigation/navigation.js'
import { readFile } from './fs/readFile.js'
import { createFile } from './fs/createFile.js'
import { renameFile } from './fs/renameFile.js'
import { copyFile } from './fs/copyFile.js'
import { moveFile } from './fs/moveFile.js'
import { removeFile } from './fs/removeFile.js'
import { controller } from './os/osController.js'
import { calcHash } from './hash/calcHash.js'
import { compress } from './gzip/compress.js'
import { decompress } from './gzip/decompress.js'

const rl = createInterface({
	input: stdin,
	output: stdout,
})

const correctValueStdin = data => data.split(/\s/).at(0)

const goodbyeMessage = () => {
	rl.close()
	console.log(`Thank you for using File Manager, ${env.userName}, goodbye!`)
}

rl.on('line', async data => {
	const command = correctValueStdin(data)
	switch (command) {
		case 'up':
			upWorkingDirectory()
			messageCurrentPath()
			break
		case 'ls':
			await listFiles()
			messageCurrentPath()
			break
		case 'cd':
			await moveNewWorkingDirectory(data)
			messageCurrentPath()
			break
		case 'cat':
			await readFile(data)
			break
		case 'add':
			await createFile(data)
			messageCurrentPath()
			break
		case 'rn':
			await renameFile(data)
			messageCurrentPath()
			break
		case 'cp':
			await copyFile(data)
			break
		case 'mv':
			await moveFile(data)
			break
		case 'rm':
			await removeFile(data)
			messageCurrentPath()
			break
		case 'os':
			controller(data)
			messageCurrentPath()
			break
		case 'hash':
			calcHash(data)
			break
		case 'compress':
			compress(data)
			break
		case 'decompress':
			decompress(data)
			break
		case '.exit':
			goodbyeMessage()
			break
		default:
			messageInvalid()
	}
})

rl.on('SIGINT', goodbyeMessage)

rl.on('exit', () => {
	console.log(`Thank you for using File Manager, ${env.userName}, goodbye!`)
})
