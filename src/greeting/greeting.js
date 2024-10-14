import { argv, env } from 'node:process'
import { EOL } from 'node:os'

const arg = argv.slice(2)
const userArgv = arg.find(el => el.startsWith('--username'))
const userName = userArgv ? userArgv.split('=').at(1) : 'guest'
env.userName = userName

console.log(`${EOL}Welcome to the File Manager, ${userName}!${EOL}`)
