import { config as setConfigFile } from 'dotenv'

import { initBot } from './config/bot.js'
import { path } from './helpers/path-resolver.js'

setConfigFile({
	path: path(import.meta.url, '../config.env')
})

const bot = await initBot()

bot.launch()

console.info('App started')
