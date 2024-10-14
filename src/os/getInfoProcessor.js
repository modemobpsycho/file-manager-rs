import { cpus } from 'node:os'

const CONVERSION_UNIT = 1000

const convertValuesSpeed = value => {
	const convert = Number(value) / CONVERSION_UNIT
	return convert
}

export const getInfoProccesor = () => {
	const proccesorInfo = cpus()
	const arrayProccesors = proccesorInfo.reduce((acc, item, indx) => {
		const objectInfo = {}
		const speed = convertValuesSpeed(item.speed)
		objectInfo.model = item.model.trim()
		objectInfo.speed = `${speed} GHz`
		acc[indx + 1] = objectInfo
		
		return acc
	}, {})
	console.table(arrayProccesors)
}
