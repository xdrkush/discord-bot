const Discord = require('discord.js');

module.exports = msg => {
  // check le premier mot après le prefix complet "!!bot action"
  const action = msg.params[0];

  // Decide what action to take
  switch (action) {
    case 'ping':
      console.log('test ping')
      msg.reply('Pong !');
      break;
    case 'help':
      msg.channel
        .send({
          embed: require('./helpEmbed').embed
        })
        .catch(err => console.log(err));
      break;
  }

};