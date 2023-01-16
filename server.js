const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const db = require('./db/db');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static('public'));


// The following HTML routes should be created:

// COMPLETED: `GET /notes` should return the `notes.html` file.

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// COMPLETED: `GET *` should return the `index.html` file.

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

const readFile = util.promisify(fs.readFile)

// The following API routes should be created:

// TODO: `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.

app.get('/api/notes', (req, res) => {
    res.status(200).json(db);

    console.info(`${req.method} request received to get notes`);

  });

// * `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a note`);
  
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

      fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if(err) {
          console.log(err);
        } else {
          const notes = JSON.parse(data);
          notes.push(newNote);

          fs.writeFile('./db/db.json', JSON.stringify(notes, null, '\t'), (err) => 
          err
          ? console.error(err)
          : console.log(
            'Notes for ${newNote.title} has been written to JSON file'
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


  //-------//
app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);
