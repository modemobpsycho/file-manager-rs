import { messageInvalid } from '../utils.js'
import { getEol } from './getEol.js'
import { getHomedir } from './getHomedir.js'
import { getInfoProccesor } from './getInfoProcessor.js'
import { getUsername } from './getUsername.js'
import { getArchitect } from './getArch.js'

export const controller = data => {
	const command = data.split(/\s/).at(1)?.slice(2)
	switch (command) {
		case 'EOL':
			getEol()
			break
		case 'cpus':
			getInfoProccesor()
			break
		case 'homedir':
			getHomedir()
			break
		case 'username':
			getUsername()
			break
		case 'architecture':
			getArchitect()
			break
		default:
			messageInvalid()
	}
}
