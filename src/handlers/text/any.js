async function handleAnyTextMessage(ctx) {
	await ctx.text(ctx.t('greeting'))
}

export { handleAnyTextMessage }
