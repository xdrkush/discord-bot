// Import command
const ping = require('./ping')
const button = require('./button')
const selectMenu = require('./selectMenu')

// Array commands
const commands = [ ping, button, selectMenu ]

// exports commands
module.exports = { commands }