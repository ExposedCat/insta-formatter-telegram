import { path } from '../helpers/path-resolver.js'

import Telegraf from 'telegraf'
import { ExtendedContext } from './telegraf-context.js'

import { initLocalesEngine } from './locales.js'
import { processError } from '../helpers/global-errors-processor.js'

import { handlePhoto } from '../handlers/photo.js'
import { handleDocument } from '../handlers/document.js'
import { handleStartCommand } from '../handlers/text/start.js'
import { handleAnyTextMessage } from '../handlers/text/any.js'

async function initBot() {
	const bot = new Telegraf(process.env.TOKEN, {
		contextType: ExtendedContext
	})

	bot.use(Telegraf.session())
	const localeEngine = initLocalesEngine(path(import.meta.url, '../locales'))
	bot.use(localeEngine.middleware())

	bot.start(handleStartCommand)
	bot.on('photo', handlePhoto)
	bot.on('document', handleDocument)
	bot.on('message', handleAnyTextMessage)

	bot.catch(processError)

	return bot
}

export { initBot }
