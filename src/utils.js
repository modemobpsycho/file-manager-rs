import { env } from 'node:process'
import { EOL } from 'node:os'

export const messageCurrentPath = () =>
	console.log(`You are currently in ${env.work_directory}`)

export const messageInvalid = () => console.log(`${EOL}Invalid input${EOL}`)

export const messageFsFailed = () => console.log(`${EOL}Operation failed${EOL}`)
