const express = require('express');
const db = require('./data/db');
const server = express();
server.use(express.json());
// implement your API here

server.post('/users', (req, res) => {
  const newUser = req.body;
  db.add(newUser)
    .then(newUser => {
      if (newUser) {
        res.status(201).json(newUser);
      } else {
        res.status(400).json({
          message: 'Please provide name and bio for the user.',
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        err: err,
        message: 'There was an error while saving the user to the database.',
      });
    });
});

server.get('/users', (req, res) => {
  db.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({
        err: err,
        message: 'The users information could not be retrieved.',
      });
    });
});

server.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  // const id = req.params.id;
  db.remove(id)
    .then(deletedUser => {
      if (deletedUser) {
        res.json(deleted);
      } else {
        res.status(404).json({
          message: 'invalid hub id',
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        err: err,
        message: 'failed to destroy hub',
      });
    });
});

server.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db.update(id, changes)
    .then(updated => {
      if (updated) {
        res.json(updated);
      } else {
        res.status(404).json({
          message: 'invalid hub id',
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        err: err,
        message: 'failed to update hub',
      });
    });
});

server.get('/users/:id', (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(users => {
      if (users) {
        res.json(users);
      } else {
        res.status(404).json({
          message: 'The user with the specified ID does not exist. ',
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        err: err,
        message: 'The user information could not be retrieved. ',
      });
    });
});

server.listen(4000, () => {
  console.log('Server is running on port 4000...');
});
