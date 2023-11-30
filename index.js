const express = require("express");
var mysql = require("mysql2");
const { faker } = require("@faker-js/faker");
const app = express();
const port = 3000;

const connectionConfig = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};

const connection = mysql.createConnection(connectionConfig);
connection.connect();

async function query(sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (error, results, fields) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
}

async function createTable() {
  const sql = `CREATE  TABLE IF NOT EXISTS people(id int NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL, PRIMARY KEY(id))`;
  await query(sql);
}

async function addPerson() {
  const sql = `INSERT INTO people(name) values('${faker.person.firstName()}')`;
  await query(sql);
}

app.get("/", async (req, res) => {
  await createTable();

  await addPerson();

  const persons = await query("SELECT * FROM people");

  const response = `
    <div>
      <h1>Full Cycle</h1>
      <ul>
        ${persons.map((person) => `<li>${person.name}</li>`).join(" ")}
      </ul>
    </div>
  `;

  res.send(response);
});

app.listen(port, () => {
  console.log("Rodando na porta " + port);
});
