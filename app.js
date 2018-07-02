const fs = require('fs');
// const os = require('os');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
  describe: 'Title of note',
  demand: true,
  alias: 't'
};

const bodyOptions = {
  describe: 'Body of note',
  demand: true,
  alias: 'b'
};

const argv = yargs
  .command('add', 'Add a new note', {
      title: titleOptions,
      body: bodyOptions
  })
  .command('list', 'List all notes')
  .command('read', 'Read a note', {
      title: titleOptions
  })
  .command('remove', 'Remove a note', {
      title: titleOptions
  })
  .help()
  .argv;
var command = argv._[0];

if (command === 'add'){
  var note = notes.addNote(argv.title, argv.body);
  if (note){
    console.log('Note added');
    notes.logNote(note);
  } else {
    console.log('Duplicate note found', argv.title, argv.body);
  }

} else if (command === 'list'){

  var allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s).`);
  allNotes.forEach((note) => notes.logNote(note) );

} else if (command === 'read'){
  var note = notes.getNote(argv.title);
  if (note){
    console.log('Reading note');
    notes.logNote(note);
  } else {
    console.log('Note not found');
  }

} else if (command === 'remove'){
  var noteRemoved = notes.deleteNote(argv.title);
  var message = noteRemoved ? 'Note was removed' : 'Note not found';
  console.log(message);
} else {
  console.log('Command not recognized');
}


// var filteredArray = _.uniq(['ilo', 1, 'ilo', 1, 2, 3]);
// console.log(filteredArray);

// console.log(_.isString(true));
// console.log(_.isString('true'));

//console.log('Result: ', notes.add(10, -2));

// var user = os.userInfo();
//
// fs.appendFile('greetings.txt', `\n Hello ${user.username}! You are ${notes.age}.`, function(err){
//   if (err) {
//     console.log('Unable to write to file.');
//   }
// });

//fs.appendFileSync('greetings.txt', 'Hello World!');
