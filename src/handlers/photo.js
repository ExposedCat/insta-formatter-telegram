async function handlePhoto(ctx) {
	await ctx.text(ctx.t('sendUncompressed'))
}

export { handlePhoto }
