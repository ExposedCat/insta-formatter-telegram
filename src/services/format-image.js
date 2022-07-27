import fs from 'fs'

import { pipe } from '../helpers/fs.js'
import { uploadImage } from '../helpers/requests.js'

async function formatImage(path) {
	try {
		const { isError, data } = await uploadImage(path)
		if (isError) {
			throw data
		}
		const output = fs.createWriteStream(path)
		await pipe(data, output)
		return {
			isError: false,
			data: path
		}
	} catch (error) {
		return {
			isError: true,
			data: error.message
		}
	}
}

export { formatImage }
