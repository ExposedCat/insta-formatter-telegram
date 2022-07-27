async function handleStartCommand(ctx) {
	await ctx.text(ctx.t('greeting'))
}

export { handleStartCommand }
