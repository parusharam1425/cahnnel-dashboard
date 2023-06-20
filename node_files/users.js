const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Dashboard',
    password: 'Parshaw1425',
    port: 5432,
});

const addProject = (body) => {
  return new Promise(function (resolve, reject) {
    const { title, department, status } = body;
    pool.query(
      'INSERT INTO projects (title, department, status) VALUES ($1, $2, $3) RETURNING *',
      [title, department, status],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows && results.rows[0]) {
          resolve(`A new project has been added: ${results.rows[0]}`);
        } else {
          reject(new Error('Failed to add a new priject.'));
        }
      }
    );
  });
};

const getProject = () => {
    return new Promise(function (resolve, reject) {
        pool.query('SELECT * FROM projects', (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
}

const deleteProject = (id) => {
  return new Promise(function (resolve, reject) {
      pool.query('DELETE FROM projects WHERE id = $1', [id], (error, results) => {
          if (error) {
              reject(error);
          }
          resolve(`Project with ID ${id} has been deleted.`);
      });
  });
};

const getUser = () => {
    return new Promise(function (resolve, reject) {
        pool.query('SELECT * FROM users', (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
}

const addUser = (body) => {
    return new Promise(function (resolve, reject) {
      const { username, password } = body;
      pool.query(
        'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
        [username, password],
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows && results.rows[0]) {
            resolve(`A new user has been added: ${results.rows[0]}`);
          } else {
            reject(new Error('Failed to add a new user.'));
          }
        }
      );
    });
  };
  

const deleteUser = (id) => {
    return new Promise(function (resolve, reject) {
        pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(`Users with ID ${id} has been deleted.`);
        });
    });
};

module.exports = {
    getUser,
    addUser,
    deleteUser,
    addProject,
    getProject,
    deleteProject
};