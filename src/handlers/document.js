import { deleteFile } from '../helpers/fs.js'
import { formatImage } from '../services/format-image.js'
import { dowloadDocument } from '../services/download-document.js'

async function handleDocument(ctx) {
	const { file_id: id, file_name: name } = ctx.message.document
	const { isError, data } = await dowloadDocument(ctx.telegram, id)

	if (isError) {
		const errorMessage = ctx.t('unknownError', { error: data })
		await ctx.text(errorMessage)
	} else {
		const { isError, data: formattedData } = await formatImage(data)
		if (isError) {
			const errorMessage = ctx.t('unknownError', {
				error: formattedData
			})
			await ctx.text(errorMessage)
		} else {
			await ctx.replyWithDocument(
				{ source: formattedData },
				{ filename: name }
			)
			await deleteFile(formattedData)
		}
	}
}

export { handleDocument }
