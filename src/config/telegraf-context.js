import Telegraf from 'telegraf'

import { sendMessage } from '../helpers/send-message.js'

class ExtendedContext extends Telegraf.Context {
	constructor(update, telegram, options) {
		super(update, telegram, options)
	}

	text = sendMessage

	t(label, data = {}) {
		return this.i18n.t(label, data)
	}
}

export { ExtendedContext }
