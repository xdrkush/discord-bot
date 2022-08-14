const Discord = require('discord.js');

module.exports = msg => {
  // Get the command action - add | remove | list
  const action = msg.params[0];

  // Decide what action to take
  switch (action) {
    case 'ping':
      console.log('test ping')
      msg.reply('Pong !');
      break;
  }

};