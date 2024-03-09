import mongoose from 'mongoose'

// const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fsopenuser:${password}@fsopen.dtzbuqi.mongodb.net/noteApp?retryWrites=true&w=majority&appName=fsopen`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)


 const note = new Note({
  content: 'The class is coding full stack mongo all day every day',
  important: true,
})

note.save().then(result => {
  console.log('note saved!')
  //mongoose.connection.close()
})


Note.find({ /* important: true */}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })
  