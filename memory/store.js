const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the in-memory SQlite database.');
    db.run(`CREATE TABLE IF NOT EXISTS conversations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      timestamp TEXT NOT NULL,
      user_input TEXT,
      ai_response TEXT
    )`, (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log('conversations table created');
      }
    });
    db.run(`CREATE TABLE IF NOT EXISTS memories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      timestamp TEXT NOT NULL,
      memory TEXT
    )`, (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log('memories table created');
      }
    });
    db.run(`CREATE TABLE IF NOT EXISTS context (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      timestamp TEXT NOT NULL,
      key TEXT UNIQUE NOT NULL,
      value TEXT
    )`, (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log('context table created');
      }
    });

  }
});


const getDateTime = () => {
  return new Date().toISOString();
};

const addConversation = (userInput, aiResponse) => {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare('INSERT INTO conversations (timestamp, user_input, ai_response) VALUES (?, ?, ?)', (err) => {
      if (err) {
        reject(err);
      } else {
        stmt.run(getDateTime(), userInput, aiResponse, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      }
    });
  });
};


const addMemory = (memory) => {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare('INSERT INTO memories (timestamp, memory) VALUES (?, ?)', (err) => {
      if (err) {
        reject(err);
      } else {
        stmt.run(getDateTime(), memory, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      }
    });
  });
};

const addContext = (key, value) => {
  return new Promise((resolve, reject) => {
    db.run(`INSERT OR REPLACE INTO context (timestamp, key, value) VALUES (?, ?, ?)`, getDateTime(), key, value, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};


const getContext = (key) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT value FROM context WHERE key = ?`, key, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row ? row.value : null);
      }
    });
  });
};

const searchConversations = (query) => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM conversations WHERE user_input LIKE '%${query}%' OR ai_response LIKE '%${query}%'`, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const searchMemories = (query) => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM memories WHERE memory LIKE '%${query}%'`, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

module.exports = {
  addConversation,
  addMemory,
  addContext,
  getContext,
  searchConversations,
  searchMemories
};