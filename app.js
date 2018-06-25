console.log('Starting app.js');

const fs = require('fs');
// const os = require('os');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');


const argv = yargs.argv;
var command = argv._[0];
console.log('Command: ', command);
console.log('Process: ', process.argv);
console.log('Yargs: ', argv);

if (command === 'add'){
  var note = notes.addNote(argv.title, argv.body);
  if (note){
    console.log('Note added');
    notes.logNote(note);
  } else {
    console.log('Duplicate note found', argv.title, argv.body);
  }

} else if (command === 'list'){
  notes.getAll();
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
