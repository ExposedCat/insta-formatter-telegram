import { downloadFile } from '../helpers/fs.js'

async function dowloadDocument(api, documentId) {
	const { file_path: documentPath } = await api.getFile(documentId)
	const url = `https://api.telegram.org/file/bot${process.env.TOKEN}/${documentPath}`
	const fileName = documentPath.replace('documents/', '')
	const data = await downloadFile(url, fileName)
	return data
}

export { dowloadDocument }
