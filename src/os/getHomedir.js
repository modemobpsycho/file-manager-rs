import { homedir } from 'node:os'
import { EOL } from 'node:os'

export const getHomedir = () => {
	const result = `${EOL}${homedir()}${EOL}`
	console.log(result)
}
