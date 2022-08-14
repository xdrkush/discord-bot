const Discord = require('discord.js');
const User = require('../config/model/UserModel.js')
const myEvents = require('../events')

module.exports = msg => {
  // check le premier mot après le prefix complet "!!bot action"
  const action = msg.params[0];
  // check le second mot après le prefix complet "!!bot action target"
  const target = msg.params[1];
  // Le premier user cité
  const users = msg.mentions.users.first()

  // Decide what action to take
  switch (action) {
    case 'ping':
      myEvents.emit('ping', msg )
      break;
    case 'hello':
      if (!hasTarget()) return;
      myEvents.emit('hello', users, msg )
      break;
    case 'add':
      if (!hasTarget()) return;
      if (users.bot === true) status = 'bot';
      else status = 'user';
      if (users) {
        User
          .create({
            username: users.username,
            idDiscord: users.id,
            status: status,
            isVerified: users.verified
          }, (err) => {
            if (err) console.log(err)
            msg.reply('User create');
          })
        // .catch(err => console.log(err))
      } else msg.reply('Une erreur est survenue !');
      break;
    case 'get':
      User
        .find({})
        .exec((err, user) => {
          if (err) console.log(err)
          console.log(user)
          user.forEach(u => {
            msg.channel
              .send('user: ' + u.username)
              .catch(err => console.log(err));
          })
        })
      break;
    case 'del':
      if (!hasTarget()) return;
      if (users) {
        User
          .deleteOne({ idDiscord: users.id })
          .exec((err, user) => {
            if (err) console.log(err)
            console.log(user)
            msg.channel
              .send('del to db')
              .catch(err => console.log(err));
          })
      } else msg.reply('Une erreur est survenue !')
      break;
    case 'help':
      msg.channel
        .send({
          embed: require('../embed/helpEmbed').embed
        })
        .catch(err => console.log(err));
      break;
  }
  function hasTarget() {
    if (!target) {
      msg.channel.send(`Usage: \`\`${msg.prefix}${msg.cmd} ${action} <target>\`\``).catch(err => console.log(err));
      return false;
    }
    return true;
  }

};