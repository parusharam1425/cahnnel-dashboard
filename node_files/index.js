const express = require('express')
const app = express()
const port = 3001
const user_data = require('./users')
app.use(express.json())

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');

  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');

  next();
});
app.get('/', (req, res) => {
  user_data.getUser()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

app.post('/users', (req, res) => {
  user_data.addUser(req.body)
    .then(response => {
      res.status(200).send(response);

    })
    .catch(error => {
      res.status(500).send(error);
    })
})

app.delete('/users/:id', (req, res) => {
  const userID = req.params.id;
  user_data.deleteUser(userID)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});


//Project details node

app.post('/projects', (req, res) => {
  user_data.addProject(req.body)
    .then(response => {
      res.status(200).send(response);

    })
    .catch(error => {
      res.status(500).send(error);
    })
})

app.get('/projects', (req, res) => {
  user_data.getProject()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

app.delete('/projects/:id', (req, res) => {
  const userID = req.params.id;
  user_data.deleteProject(userID)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});


//customer details

app.post('/customers', (req, res) => {
  user_data.addCustomer(req.body)
    .then(response => {
      res.status(200).send(response);

    })
    .catch(error => {
      res.status(500).send(error);
    })
})

app.get('/customers', (req, res) => {
  user_data.getCustomer()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

app.delete('/customers/:id', (req, res) => {
  const userID = req.params.id;
  user_data.deleteCustomer(userID)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})