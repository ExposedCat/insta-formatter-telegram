import fs from 'fs'

import { getImage } from './requests.js'
import { path as resolvePath } from './path-resolver.js'

const makePath = path => resolvePath(import.meta.url, path)

async function createDirIfNotExists(path) {
	try {
		await fs.promises.access(path)
	} catch {
		await fs.promises.mkdir(path)
	}
}

async function pipe(from, to) {
	return new Promise((resolve, reject) => {
		to.on('finish', resolve)
		to.on('error', reject)
		from.pipe(to)
	})
}

async function downloadFile(url, name) {
	try {
		await createDirIfNotExists(makePath('../../files'))
		const path = makePath(`../../files/${name}`)
		const file = fs.createWriteStream(path)
		const { isError, data } = await getImage(url)
		if (isError) {
			throw data
		}
		await pipe(data, file)
		return {
			isError: false,
			data: path
		}
	} catch (error) {
		return {
			isError: true,
			data: error
		}
	}
}

async function deleteFile(url) {
	try {
		await fs.promises.unlink(url)
	} catch (error) {
		console.warn(`Can't delete file: ${error}`)
	}
}

export { downloadFile, pipe, deleteFile }
