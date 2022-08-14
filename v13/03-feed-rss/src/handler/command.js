/*
 * Find Files on commands/** /*.js
 * ******************************* */

const { glob } = require("glob")
const { promisify } = require("util")
const globPromise = promisify(glob)

module.exports = async (client) => {
  const files = await globPromise(`${process.cwd()}/src/commands/**/*.js`);
  files.map(value => {
    const file = require(value);
    const splitted = value.split("/");
    const directory = splitted[splitted.length - 2];

    if (file.name) {
      const properties = { directory, ...file };
      client.commands.set(file.name, properties);
    }
  })
  
  const eventFiles = await globPromise(`${process.cwd()}/src/events/*.js`);
  eventFiles.map(value => require(value))

}