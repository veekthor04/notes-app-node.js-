const fs = require('fs')
const chalk = require('chalk')

const readNote = (title) => {
  const notes = loadNotes()
  const note = notes.find((note) => note.title === title)
  if (note){
    console.log(chalk.bgGreen.black(note.title))
    console.log(chalk.green(note.body))
  } else {
    console.log(chalk.bgRed.black('No note found'));
  }
}

const addNote = (title, body) => {
  const notes = loadNotes()
  const duplicateNote = notes.find((note) => note.title === title)
  if(!duplicateNote){
    notes.push({
      title: title,
      body: body
    })
    saveNotes(notes)
    console.log(chalk.bgGreen.black("New note added!"))
  } else {
    console.log(chalk.bgRed.black('Title has been taken'))
  }

}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (e){
    return []
  }

}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}

const removeNote = (title) => {
  const notes = loadNotes()
  const notesToKeep = notes.filter((note) => note.title !== title)
  if(notesToKeep.length != notes.length){
    saveNotes(notesToKeep)
    console.log(chalk.bgGreen.black('Note removed'))
  } else {
    console.log(chalk.bgRed.black('Sorry note does not exist!'))
  }

}

const listNotes = () => {
  const notes = loadNotes()
  console.log(chalk.bgYellow.black('Your notes'))
  notes.forEach((note) => console.log(chalk.bgBlack.yellow(note.title)))

}

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
}
