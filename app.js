const notes = require('./notes.js')
const yargs = require('yargs')
const chalk = require('chalk')

//customize yargs version
yargs.version('1.1.0')

//create add command'
yargs.command({
  command: 'add',
  describe: 'Add a new',
  builder:{
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      descibe: 'Note body',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body)
  }
})

yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title : {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.removeNote(argv.title)
  }
})

yargs.command({
  command:'list',
  descibe: 'List out the notes',
  handler() {
    notes.listNotes()
  }
})

yargs.command({
  command:'read',
  descibe: 'read a note',
  builder: {
    title : {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.readNote(argv.title)
  }
})

yargs.parse()
