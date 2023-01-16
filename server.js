const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const util = require('util');
const fs = require('fs');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// The following HTML routes should be created:

// COMPLETED: `GET *` should return the `index.html` file.

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

const readFromFile = util.promisify(fs.readFile);

// COMPLETED: `GET /notes` should return the `notes.html` file.

app.get('/api/notes', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});




// The following API routes should be created:

// TODO: `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.

// * `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

app.post('/api/notes', (req, res) => {
  console.info(`${req.method} request received to add notes`);
  
    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;
  
    // If all the required properties are present
    if (title && text) {
      // Variable for the object we will save
      const newNote = {
        title,
        text,
        note_id: uuidv4(),
      };

      fs.readFile('./db/db.json', `utf-8`, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          const notes = JSON.parse(data);
          notes.push(newNote);
  
          fs.writeFile(`./db/db.json`, JSON.stringify(notes, null, `\t`), (err) =>
            err
              ? console.error(err)
              : console.log(
                `Notes for ${newNote.title} has been written to JSON file`
              )
          );
        }
      })

      const response = {
        status: 'success',
        body: newNote,
      };
  
      console.log(response);
      res.status(201).json(response);
    } else {
      res.status(500).json('Error in posting note');
    }
  });

  app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

  //-------//
app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);
