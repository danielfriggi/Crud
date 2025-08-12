const fs = require("fs");
const path = require("path");


const filePath = path.resolve(__dirname, "users.json");

function readUsers() {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Erro lendo arquivo users.json:", err);
    return [];
  }
}

function writeUsers(users) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
  } catch (err) {
    console.error("Erro escrevendo no arquivo users.json:", err);
  }
}

module.exports = { readUsers, writeUsers };
