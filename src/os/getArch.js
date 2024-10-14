import { arch } from 'node:os'
import { EOL } from 'node:os'

export const getArchitect = () => {
	const architect = arch()
	const result = `${EOL}${architect}${EOL}`
	
	console.log(result)
}
