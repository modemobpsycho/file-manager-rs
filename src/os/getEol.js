import { EOL } from 'node:os'

export const getEol = () => {
	const symbol = JSON.stringify(EOL)
	console.log(`${EOL}${symbol}${EOL}`)
}
