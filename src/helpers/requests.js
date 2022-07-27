import axios from 'axios'
import fs from 'fs/promises'
import { Readable } from 'stream'

const requestOptions = {
	headers: {
		'Content-Type': 'image/png'
	},
	encoding: null,
	responseType: 'stream'
}
Object.freeze(requestOptions)

async function getImage(url) {
	try {
		const { data } = await axios.get(url, requestOptions)
		return { isError: false, data }
	} catch (error) {
		return { isError: true, data: error }
	}
}

async function uploadImage(imagePath) {
	try {
		const imageData = await fs.readFile(imagePath)
		const image = Readable.from(imageData)
		const { data } = await axios.post(
			process.env.API_ENDPOINT,
			image,
			requestOptions
		)
		return { isError: false, data }
	} catch (error) {
		return { isError: true, data: error }
	}
}

export { getImage, uploadImage }
