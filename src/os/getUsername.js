import { userInfo } from 'node:os'
import { EOL } from 'node:os'

export const getUsername = () => {
	const { username } = userInfo()
	const result = `${EOL}${username}${EOL}`
	
	console.log(result)
}
